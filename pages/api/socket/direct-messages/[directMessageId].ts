import { MemberRole } from '@prisma/client';
import { NextApiRequest } from 'next';

import {
    ApiErrors,
    HTTP_CODE,
    HTTP_CODE_ERRORS,
    HTTP_METHODS,
    socketKeys,
} from '@/models';
import { getProfile, db } from '@/lib';
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
         * Destructuring the request query the conversation id and the direct message id.
         */
        const { directMessageId, conversationId } = req.query;

        /**
         * Destructuring the body of the request the content.
         */
        const { content } = req.body;

        // In case the direct message id does not exist, respond that the direct message id does not exist.
        if (!directMessageId) {
            return res.status(HTTP_CODE_ERRORS.BAD_REQUEST).json({
                error: ApiErrors.DIRECT_MESSAGE_ID_MISSING,
            });
        }

        // In case the conversation id does not exist, respond that the conversation id does not exist.
        if (!conversationId) {
            return res.status(HTTP_CODE_ERRORS.NOT_FOUND).json({
                message: ApiErrors.CONVERSATION_ID_MISSING,
            });
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
                            profileId: (profile as any).id,
                        },
                    },
                    {
                        memberTwo: {
                            profileId: (profile as any).id,
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
            return res.status(HTTP_CODE_ERRORS.NOT_FOUND).json({
                message: ApiErrors.CONVERSATION_NOT_FOUND,
            });
        }

        /**
         * Constant where the member found.
         */
        const member =
            conversation.memberOne.profileId === (profile as any).id
                ? conversation.memberOne
                : conversation.memberTwo;

        // In case the member does not exist, respond that the member does not exist.
        if (!member) {
            return res.status(HTTP_CODE_ERRORS.NOT_FOUND).json({
                message: ApiErrors.MEMBER_NOT_FOUND,
            });
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
            return res.status(HTTP_CODE_ERRORS.NOT_FOUND).json({
                error: ApiErrors.DIRECT_MESSAGE_ID_NOT_FOUND,
            });
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
            return res.status(HTTP_CODE_ERRORS.UNAUTHORIZED).json({
                error: ApiErrors.UNAUTHORIZED,
            });
        }

        // If the method is DELETE, update the message so that it is a deleted message.
        if (req.method === HTTP_METHODS.DELETE) {
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
        if (req.method === HTTP_METHODS.PATCH) {
            // If the user not owner message.
            if (!isMessageOwner) {
                return res.status(HTTP_CODE_ERRORS.UNAUTHORIZED).json({
                    message: ApiErrors.UNAUTHORIZED,
                });
            }

            // If the message is the same as the message in the database, return an error.
            if (directMessage.content === content) {
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
        const updateKey = socketKeys.UPDATE_KEY(conversation.id);

        // Update message in sockets.
        res?.socket?.server?.io?.emit(updateKey, directMessage);

        // Return response with message updated.
        return res.status(HTTP_CODE.SUCCESS).json(directMessage);
    } catch (error) {
        console.log(ApiErrors.DIRECT_MESSAGE_ID, error);
        // Return an error response if there is an error.
        return res.status(HTTP_CODE_ERRORS.INTERNAL_ERROR).json({
            error: ApiErrors.INTERNAL_ERROR,
        });
    }
}
