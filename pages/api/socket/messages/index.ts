import { NextApiRequest } from 'next';

import { getProfile, db } from '@/lib';
import { NextApiResponseServerIo } from '@/types';
import {
    socketKeys,
    ApiErrors,
    HTTP_CODE_ERRORS,
    HTTP_CODE,
    HTTP_METHODS,
} from '@/models';

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
    if (req.method !== HTTP_METHODS.POST) {
        return res.status(HTTP_CODE_ERRORS.METHOD_NOT_ALLOWED).json({
            error: ApiErrors.METHOD_NOT_ALLOWED,
        });
    }

    try {
        const { getPagesServerProfile } = await getProfile(req, res);

        /**
         * The current profile in session.
         */
        const profile = getPagesServerProfile();

        /**
         * Destructuring the body of the request the content of the message and the url of the possible file.
         */
        const { content, fileUrl } = req.body;

        /**
         * Destructuring the request query the server id and the channel id.
         */
        const { serverId, channelId } = req.query;

        // In case the server id does not exist, respond that the server id does not exist.
        if (!serverId) {
            return res.status(HTTP_CODE_ERRORS.BAD_REQUEST).json({
                error: ApiErrors.SERVER_ID_MISSING,
            });
        }

        // In case the channel id does not exist, respond that the channel id does not exist.
        if (!channelId) {
            return res.status(HTTP_CODE_ERRORS.BAD_REQUEST).json({
                error: ApiErrors.CHANNEL_ID_MISSING,
            });
        }

        // In case the content does not exist, respond that the content does not exist.
        if (!content) {
            return res.status(HTTP_CODE_ERRORS.BAD_REQUEST).json({
                error: ApiErrors.CONTENT_MISSING,
            });
        }

        /**
         * Constant where the server found based on an id is stored.
         */
        const server = await db.server.findFirst({
            where: {
                id: serverId as string,
                members: {
                    some: {
                        profileId: (profile as any).id,
                    },
                },
            },
            include: {
                members: true,
            },
        });

        // In case the server does not exist, respond that the server does not exist.
        if (!server) {
            return res.status(HTTP_CODE_ERRORS.NOT_FOUND).json({
                message: ApiErrors.SERVER_NOT_FOUND,
            });
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
            return res.status(HTTP_CODE_ERRORS.NOT_FOUND).json({
                message: ApiErrors.CHANNEL_NOT_FOUND,
            });
        }

        /**
         * Constant where the member found based on an id is stored.
         */
        const member = server.members.find(
            (member) => member.profileId === (profile as any).id
        );

        // In case the member does not exist, respond that the member does not exist.
        if (!member) {
            return res.status(HTTP_CODE_ERRORS.NOT_FOUND).json({
                message: ApiErrors.MEMBER_NOT_FOUND,
            });
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
        const channelKey = socketKeys.MESSAGE_KEY(channelId);

        // Respond to the client with the previously created message and with the previously constructed key.
        res?.socket?.server?.io?.emit(channelKey, message);

        // Respond with the message in case everything has gone correctly.
        return res.status(HTTP_CODE.SUCCESS).json(message);
    } catch (error) {
        console.error(ApiErrors.MESSAGES_POST, error);
        // Return an error response if there is an error.
        return res.status(HTTP_CODE_ERRORS.INTERNAL_ERROR).json({
            message: ApiErrors.INTERNAL_ERROR,
        });
    }
}
