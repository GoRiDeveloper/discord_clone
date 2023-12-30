import { NextApiRequest } from 'next';

import { currentProfilePages, db } from '@/lib';
import { NextApiResponseServerIo } from '@/types';

/**
 * Chat message manager.
 *
 * @param { NextApiRequest } req - Next api route request.
 * @param { NextApiResponseServerIo } res - Next Socket Friendly API Route Answer.
 *
 * @returns { Promise<void> } Response to send message.
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo
): Promise<void> {
    // If the method is different from POST, respond that the method is not allowed..
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    console.log('accionado');
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
         * Destructuring the request query the server id and the channel id.
         */
        const { serverId, channelId } = req.query;

        // If there is no user logged in, we return an unauthorized error.
        if (!profile) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // In case the server id does not exist, respond that the server id does not exist.
        if (!serverId) {
            return res.status(400).json({ error: 'Server ID missing' });
        }

        // In case the channel id does not exist, respond that the channel id does not exist.
        if (!channelId) {
            return res.status(400).json({ error: 'Channel ID missing' });
        }

        // In case the content does not exist, respond that the content does not exist.
        if (!content) {
            return res.status(400).json({ error: 'Content missing' });
        }

        // In case the file url does not exist, respond that the file url does not exist.
        // if (!fileUrl) {
        //     return res.status(400).json({ error: 'File url missing' });
        // }

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
         * Constant where the message to be saved in the database is stored.
         */
        const message = await db.message.create({
            data: {
                content,
                fileUrl,
                channelId: channelId as string,
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
         * Build the channel key.
         */
        const channelKey = `chat:${channelId}:messages`;

        // Respond to the client with the previously created message and with the previously constructed key.
        res?.socket?.server?.io?.emit(channelKey, message);

        // Respond with the message in case everything has gone correctly.
        return res.status(200).json(message);
    } catch (error) {
        console.log('[MESSAGES_POST]', error);
        // Return an error response if there is an error.
        return res.status(500).json({ message: 'Internal Error' });
    }
}
