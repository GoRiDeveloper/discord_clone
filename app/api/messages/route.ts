import { Message } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { getProfile, db } from '@/lib';
import { ApiErrors, SearchParamsModel, HTTP_CODE_ERRORS } from '@/models';

/**
 * Messages batch.
 */
const MESSAGES_BATCH = 10;

/**
 * Function to find messages in the database.
 *
 * @param { NextRequest } req - Next request.
 *
 * @returns { Promise<NextResponse> } Found messages.
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        const { getServerProfile } = await getProfile();

        // Verify the current profile in session.
        getServerProfile();

        // Search parameters in the url.
        const { searchParams } = new URL(req.url);

        /**
         * Cursor param.
         */
        const cursor = searchParams.get(SearchParamsModel.CURSOR);

        /**
         * Get Channel Id in url params.
         */
        const channelId = searchParams.get(SearchParamsModel.CHANNEL_ID);

        // In case the channel id does not exist, respond that the channel id does not exist.
        if (!channelId)
            return new NextResponse(ApiErrors.CHANNEL_ID_MISSING, {
                status: HTTP_CODE_ERRORS.BAD_REQUEST,
            });

        /**
         * Variable to store the messages found in the database.
         */
        let messages: Message[] = [];

        // If there is a cursor, we search for messages from a specific channel with
        // that cursor, if not, we search for messages from a specific channel.
        if (cursor) {
            messages = await db.message.findMany({
                take: MESSAGES_BATCH,
                skip: 1,
                cursor: {
                    id: cursor,
                },
                where: {
                    channelId,
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
            messages = await db.message.findMany({
                take: MESSAGES_BATCH,
                where: {
                    channelId,
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
        console.log(ApiErrors.MESSAGES_GET, error);
        // Return an error response if there is an error.
        return new NextResponse(ApiErrors.INTERNAL_ERROR, {
            status: HTTP_CODE_ERRORS.INTERNAL_ERROR,
        });
    }
}
