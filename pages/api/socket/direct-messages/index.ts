import { NextApiRequest } from 'next';

import { currentProfilePages, db } from '@/lib';
import { NextApiResponseServerIo } from '@/types';

/**
 * Direct chat message manager.
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
    // If the method is different from POST, respond that the method is not allowed.
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        /**
         * The current profile in session.
         */
        const profile = await currentProfilePages(req);

        /**
         * Destructuring the body of the request the content of the message and the url of the possible file.
         */
        const { content, fileUrl } = req.body;

        /**
         * Destructuring the request query the conversation id.
         */
        const { conversationId } = req.query;

        // If there is no user logged in, we return an unauthorized error.
        if (!profile) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // In case the conversation id does not exist, respond that the conversation id does not exist.
        if (!conversationId) {
            return res.status(400).json({ error: 'Conversation ID missing' });
        }

        // In case the content does not exist, respond that the content does not exist.
        if (!content) {
            return res.status(400).json({ error: 'Content missing' });
        }

        // In case the file url does not exist, respond that the file url does not exist.
        if (!fileUrl) {
            return res.status(400).json({ error: 'File url missing' });
        }

        /**
         * Direct message conversation.
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
            return res.status(404).json({ message: 'Conversation not found.' });
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
         * Constant where the message to be saved in the database is stored.
         */
        const message = await db.directMessage.create({
            data: {
                content,
                fileUrl,
                conversationId: conversationId as string,
                memberId: member.id,
            },
            include: {
                member: {
                    include: {
                        profile: true,
                    },
                },
            },
        });

        /**
         * Build the conversation key.
         */
        const conversationKey = `chat:${conversationId}:messages`;

        // Respond to the client with the previously created message and with the previously constructed key.
        res?.socket?.server?.io?.emit(conversationKey, message);

        // Respond with the message in case everything has gone correctly.
        return res.status(200).json(message);
    } catch (error) {
        console.log('[DIRECT_MESSAGES_POST]', error);
        // Return an error response if there is an error.
        return res.status(500).json({ message: 'Internal Error' });
    }
}
