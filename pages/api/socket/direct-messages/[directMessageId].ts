import { MemberRole } from '@prisma/client';
import { NextApiRequest } from 'next';

import { currentProfilePages, db } from '@/lib';
import { NextApiResponseServerIo } from '@/types';

/**
 * Handler for updating a specific direct message.
 *
 * @param { NextApiRequest } req - Next api route request.
 * @param { NextApiResponseServerIo } res - Next Socket Friendly API Route Answer.
 *
 * @returns { Promise<void> } Response to send a direct message.
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo
): Promise<void> {
    // If the method is different from DELETE or PATCH, respond that the method is not allowed.
    if (req.method !== 'DELETE' && req.method !== 'PATCH') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        /**
         * The current profile in session.
         */
        const profile = await currentProfilePages(req);

        /**
         * Destructuring the request query the conversation id and the direct message id.
         */
        const { directMessageId, conversationId } = req.query;

        /**
         * Destructuring the body of the request the content.
         */
        const { content } = req.body;

        // If there is no user logged in, we return an unauthorized error.
        if (!profile) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // In case the direct message id does not exist, respond that the direct message id does not exist.
        if (!directMessageId) {
            return res.status(400).json({ error: 'Direct message ID missing' });
        }

        // In case the conversation id does not exist, respond that the conversation id does not exist.
        if (!conversationId) {
            return res.status(404).json({ message: 'Conversation ID missing' });
        }

        // In case the content does not exist, respond that the content does not exist.
        if (!content) {
            return res.status(400).json({ error: 'Content missing' });
        }

        /**
         * Constant where the conversation found based on an id is stored.
         */
        const conversation = await db.conversation.findFirst({
            where: {
                id: conversationId as string,
                OR: [
                    {
                        memberOne: {
                            profileId: profile.id,
                        },
                    },
                    {
                        memberTwo: {
                            profileId: profile.id,
                        },
                    },
                ],
            },
            include: {
                memberOne: {
                    include: {
                        profile: true,
                    },
                },
                memberTwo: {
                    include: {
                        profile: true,
                    },
                },
            },
        });

        // In case the conversation does not exist, respond that the conversation does not exist.
        if (!conversation) {
            return res.status(404).json({ message: 'Conversation not found' });
        }

        /**
         * Constant where the member found.
         */
        const member =
            conversation.memberOne.profileId === profile.id
                ? conversation.memberOne
                : conversation.memberTwo;

        // In case the member does not exist, respond that the member does not exist.
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }

        /**
         * Direct messages founded.
         */
        let directMessage = await db.directMessage.findFirst({
            where: {
                id: directMessageId as string,
                conversationId: conversationId as string,
            },
            include: {
                member: {
                    include: {
                        profile: true,
                    },
                },
            },
        });

        // If the message does not exist or has been deleted, return that it was not found.
        if (!directMessage || directMessage.deleted) {
            return res.status(404).json({ error: 'Direct message not found' });
        }

        /**
         * Variable for check the message is from the owner.
         */
        const isMessageOwner = directMessage.memberId === member.id;

        /**
         * Variable for check if user is admin.
         */
        const isAdmin = member.role === MemberRole.ADMIN;

        /**
         * Variable for check if user is moderator.
         */
        const isModerator = member.role === MemberRole.MODERATOR;

        /**
         * Variable for check if can edit the message.
         */
        const canModify = isMessageOwner || isAdmin || isModerator;

        // If you cannot modify the message, we return an unauthorized response.
        if (!canModify) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // If the method is DELETE, update the message so that it is a deleted message.
        if (req.method === 'DELETE') {
            directMessage = await db.directMessage.update({
                where: {
                    id: directMessageId as string,
                },
                data: {
                    fileUrl: null,
                    content: 'This message has been deleted.',
                    deleted: true,
                },
                include: {
                    member: {
                        include: {
                            profile: true,
                        },
                    },
                },
            });
        }

        // If the method is PATCH, update the message.
        if (req.method === 'PATCH') {
            // If the user not owner message.
            if (!isMessageOwner) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // Update message in the database.
            directMessage = await db.directMessage.update({
                where: {
                    id: directMessageId as string,
                },
                data: {
                    content,
                },
                include: {
                    member: {
                        include: {
                            profile: true,
                        },
                    },
                },
            });
        }

        /**
         * Direct message update key to socket.
         */
        const updateKey = `chat:${conversation.id}:messages:update`;

        // Update message in sockets.
        res?.socket?.server?.io?.emit(updateKey, directMessage);

        // Return response with message updated.
        return res.status(200).json(directMessage);
    } catch (error) {
        console.log('[DIRECT_MESSAGE_ID]', error);
        // Return an error response if there is an error.
        return res.status(500).json({ error: 'Internal Error' });
    }
}
