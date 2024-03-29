import { NextRequest, NextResponse } from 'next/server';
import { MemberRole } from '@prisma/client';

import { getProfile, db } from '@/lib';
import {
    ApiErrors,
    SearchParamsModel,
    HTTP_CODE_ERRORS,
    APP_CHANNELS,
} from '@/models';

/**
 * Function to add channel to server in database.
 *
 * @param { NextRequest } req - Next Request.
 *
 * @returns { Promise<NextResponse> } Response when adding channel to server in database.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const { getServerProfile } = await getProfile();

        /**
         * The current profile in session.
         */
        const profile = getServerProfile();

        // Get name and type channel form client.
        const { name, type } = await req.json();

        // Search parameters in the url.
        const { searchParams } = new URL(req.url);

        /**
         * Server id from the search parameters in the url.
         */
        const serverId = searchParams.get(SearchParamsModel.SERVER_ID);

        // If there is no server id, it returns a response that there is no server id.
        if (!serverId)
            return new NextResponse(ApiErrors.SERVER_ID_MISSING, {
                status: HTTP_CODE_ERRORS.BAD_REQUEST,
            });

        // if the name is "general", we return an error since the name cannot be "general".
        if (name === APP_CHANNELS.GENERAL)
            return new NextResponse(ApiErrors.NAME_NOT_GENERAL, {
                status: HTTP_CODE_ERRORS.BAD_REQUEST,
            });

        /**
         * Server: adding the channel on the server.
         */
        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: (profile as any).id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR],
                        },
                    },
                },
            },
            data: {
                channels: {
                    create: {
                        profileId: (profile as any).id,
                        name,
                        type,
                    },
                },
            },
        });

        // Return the server with the channel added.
        return NextResponse.json(server);
    } catch (error) {
        console.error(ApiErrors.CHANNELS_POST_ERROR, error);
        // Return an error response if there is an error.
        return new NextResponse(ApiErrors.INTERNAL_ERROR, {
            status: HTTP_CODE_ERRORS.INTERNAL_ERROR,
        });
    }
}
