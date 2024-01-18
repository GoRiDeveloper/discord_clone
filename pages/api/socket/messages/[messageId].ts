import { MemberRole } from '@prisma/client';
import { NextApiRequest } from 'next';

import { getProfile, db } from '@/lib';
import { NextApiResponseServerIo } from '@/types';
import {
    ApiErrors,
    socketKeys,
    HTTP_CODE,
    HTTP_CODE_ERRORS,
    HTTP_METHODS,
} from '@/models';

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
    if (
        req.method !== HTTP_METHODS.DELETE &&
        req.method !== HTTP_METHODS.PATCH
    ) {
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
         * Destructuring the request query the server id, channel id and the message id.
         */
        const { messageId, serverId, channelId } = req.query;

        /**
         * Destructuring the body of the request the content.
         */
        const { content } = req.body;

        // In case the message id does not exist, respond that the message id does not exist.
        if (!messageId) {
            return res.status(HTTP_CODE_ERRORS.BAD_REQUEST).json({
                error: ApiErrors.MESSAGE_ID_MISSING,
            });
        }

        // In case the channel does not exist, respond that the channel does not exist.
        if (!channelId) {
            return res.status(HTTP_CODE_ERRORS.NOT_FOUND).json({
                message: ApiErrors.CHANNEL_ID_MISSING,
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
            return res.status(HTTP_CODE_ERRORS.NOT_FOUND).json({
                error: ApiErrors.MESSAGE_NOT_FOUND,
            });
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
            return res.status(HTTP_CODE_ERRORS.UNAUTHORIZED).json({
                error: ApiErrors.UNAUTHORIZED,
            });
        }

        // If the method is DELETE, update the message so that it is a deleted message.
        if (req.method === HTTP_METHODS.DELETE) {
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
        if (req.method === HTTP_METHODS.PATCH) {
            // If the user not owner message.
            if (!isMessageOwner) {
                return res.status(HTTP_CODE_ERRORS.UNAUTHORIZED).json({
                    message: ApiErrors.UNAUTHORIZED,
                });
            }

            // If the message is the same as the message in the database, return an error.
            if (message.content === content) {
                return res.status(HTTP_CODE_ERRORS.BAD_REQUEST).json({
                    message: ApiErrors.EQUAL_MESSAGE,
                });
            }

            // In case the content does not exist, respond that the content does not exist.
            if (!content) {
                return res.status(HTTP_CODE_ERRORS.BAD_REQUEST).json({
                    error: ApiErrors.CONTENT_MISSING,
                });
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
        const updateKey = socketKeys.UPDATE_KEY(channelId);

        // Update message in sockets.
        res?.socket?.server?.io?.emit(updateKey, message);

        // Return response with message updated.
        return res.status(HTTP_CODE.SUCCESS).json(message);
    } catch (error) {
        console.error(ApiErrors.MESSAGE_ID, error);
        // Return an error response if there is an error.
        return res.status(HTTP_CODE_ERRORS.INTERNAL_ERROR).json({
            error: ApiErrors.INTERNAL_ERROR,
        });
    }
}
