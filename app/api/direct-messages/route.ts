import { DirectMessage } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { getProfile, db } from '@/lib';
import { ApiErrors, HTTP_CODE_ERRORS, SearchParamsModel } from '@/models';

/**
 * Messages batch.
 */
const MESSAGES_BATCH = 10;

/**
 * Function to find direct messages in the database.
 *
 * @param { NextRequest } req - Next request.
 *
 * @returns { Promise<NextResponse> } Found direct messages.
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        const { getServerProfile } = await getProfile();

        // The current profile in session.
        getServerProfile();

        // Search parameters in the url.
        const { searchParams } = new URL(req.url);

        /**
         * Cursor param.
         */
        const cursor = searchParams.get(SearchParamsModel.CURSOR);

        /**
         * Get Conversation Id in url params.
         */
        const conversationId = searchParams.get(
            SearchParamsModel.CONVERSATION_ID
        );

        // In case the conversation id does not exist, respond that the conversation id does not exist.
        if (!conversationId)
            return new NextResponse(ApiErrors.CONVERSATION_ID_MISSING, {
                status: HTTP_CODE_ERRORS.BAD_REQUEST,
            });

        /**
         * Variable to store the messages found in the database.
         */
        let messages: DirectMessage[] = [];

        // If there is a cursor, we search for messages from a specific conversation with
        // that cursor, if not, we search for messages from a specific conversation.
        if (cursor) {
            messages = await db.directMessage.findMany({
                take: MESSAGES_BATCH,
                skip: 1,
                cursor: {
                    id: cursor,
                },
                where: {
                    conversationId,
                },
                include: {
                    member: {
                        include: {
                            profile: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
        } else {
            messages = await db.directMessage.findMany({
                take: MESSAGES_BATCH,
                where: {
                    conversationId,
                },
                include: {
                    member: {
                        include: {
                            profile: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
        }

        /**
         * Variable to save the next message cursor.
         */
        let nextCursor = null;

        // If the messages exceed the allowed batch, configure the next cursor.
        if (messages.length === MESSAGES_BATCH)
            nextCursor = messages[MESSAGES_BATCH - 1].id;

        // Return the messages found and the next cursor.
        return NextResponse.json({
            items: messages,
            nextCursor,
        });
    } catch (error) {
        console.error(ApiErrors.DIRECT_MESSAGES_GET_ERROR, error);
        // Return an error response if there is an error.
        return new NextResponse(ApiErrors.INTERNAL_ERROR, {
            status: HTTP_CODE_ERRORS.INTERNAL_ERROR,
        });
    }
}
