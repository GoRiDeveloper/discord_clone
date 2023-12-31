import { MemberRole } from '@prisma/client';
import { NextApiRequest } from 'next';

import { currentProfilePages, db } from '@/lib';
import { NextApiResponseServerIo } from '@/types';

/**
 * Handler for updating a specific message.
 *
 * @param { NextApiRequest } req - Next api route request.
 * @param { NextApiResponseServerIo } res - Next Socket Friendly API Route Answer.
 *
 * @returns { Promise<void> } Response to send a message.
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
         * Destructuring the request query the server id, channel id and the message id.
         */
        const { messageId, serverId, channelId } = req.query;

        /**
         * Destructuring the body of the request the content.
         */
        const { content } = req.body;

        // If there is no user logged in, we return an unauthorized error.
        if (!profile) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // In case the message id does not exist, respond that the message id does not exist.
        if (!messageId) {
            return res.status(400).json({ error: 'Message ID missing' });
        }

        // In case the channel does not exist, respond that the channel does not exist.
        if (!channelId) {
            return res.status(404).json({ message: 'Channel ID missing' });
        }

        /**
         * Constant where the server found based on an id is stored.
         */
        const server = await db.server.findFirst({
            where: {
                id: serverId as string,
                members: {
                    some: {
                        profileId: profile.id,
                    },
                },
            },
            include: {
                members: true,
            },
        });

        // In case the server does not exist, respond that the server does not exist.
        if (!server) {
            return res.status(404).json({ message: 'Server not found' });
        }

        /**
         * Constant where the channel found based on an id is stored.
         */
        const channel = await db.channel.findFirst({
            where: {
                id: channelId as string,
                serverId: serverId as string,
            },
        });

        // In case the channel does not exist, respond that the channel does not exist.
        if (!channel) {
            return res.status(404).json({ message: 'Channel not found' });
        }

        /**
         * Constant where the member found based on an id is stored.
         */
        const member = server.members.find(
            (member) => member.profileId === profile.id
        );

        // In case the member does not exist, respond that the member does not exist.
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }

        /**
         * Message founded.
         */
        let message = await db.message.findFirst({
            where: {
                id: messageId as string,
                channelId: channelId as string,
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
        if (!message || message.deleted) {
            return res.status(404).json({ error: 'Message not found' });
        }

        /**
         * Variable for check the message is from the owner.
         */
        const isMessageOwner = message.memberId === member.id;

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
            message = await db.message.update({
                where: {
                    id: messageId as string,
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

            // In case the content does not exist, respond that the content does not exist.
            if (!content) {
                return res.status(400).json({ error: 'Content missing' });
            }

            // Update message in the database.
            message = await db.message.update({
                where: {
                    id: messageId as string,
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
         * Message update key to socket.
         */
        const updateKey = `chat:${channelId}:messages:update`;

        // Update message in sockets.
        res?.socket?.server?.io?.emit(updateKey, message);

        // Return response with message updated.
        return res.status(200).json(message);
    } catch (error) {
        console.log('[MESSAGE_ID]', error);
        // Return an error response if there is an error.
        return res.status(500).json({ error: 'Internal Error' });
    }
}
