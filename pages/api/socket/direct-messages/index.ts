import { NextApiRequest } from 'next';

import {
    socketKeys,
    ApiErrors,
    HTTP_CODE,
    HTTP_CODE_ERRORS,
    HTTP_METHODS,
} from '@/models';
import { db, getProfile } from '@/lib';
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
         * Destructuring the request query the conversation id.
         */
        const { conversationId } = req.query;

        // In case the conversation id does not exist, respond that the conversation id does not exist.
        if (!conversationId) {
            return res.status(HTTP_CODE_ERRORS.BAD_REQUEST).json({
                error: ApiErrors.CONVERSATION_ID_MISSING,
            });
        }

        // In case the content does not exist, respond that the content does not exist.
        if (!content) {
            return res.status(HTTP_CODE_ERRORS.BAD_REQUEST).json({
                error: ApiErrors.CONTENT_MISSING,
            });
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
        const conversationKey = socketKeys.MESSAGE_KEY(conversationId);

        // Respond to the client with the previously created message and with the previously constructed key.
        res?.socket?.server?.io?.emit(conversationKey, message);

        // Respond with the message in case everything has gone correctly.
        return res.status(HTTP_CODE.SUCCESS).json(message);
    } catch (error) {
        console.error(ApiErrors.DIRECT_MESSAGES_POST, error);
        // Return an error response if there is an error.
        return res.status(HTTP_CODE_ERRORS.INTERNAL_ERROR).json({
            message: ApiErrors.INTERNAL_ERROR,
        });
    }
}
