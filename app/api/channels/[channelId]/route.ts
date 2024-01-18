import { MemberRole } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { db, getProfile } from '@/lib';
import {
    APP_CHANNELS,
    ApiErrors,
    HTTP_CODE_ERRORS,
    SearchParamsModel,
} from '@/models';

/**
 * Delete channel parameters.
 */
interface ParamsChannelId {
    params: { channelId: string };
}

/**
 * Function to edit channel to server in database.
 *
 * @param { NextRequest } req - Next Request.
 *
 * @returns { Promise<NextResponse> } Response when edit channel to server in database.
 */
export async function PATCH(
    req: NextRequest,
    { params }: ParamsChannelId
): Promise<NextResponse> {
    try {
        const { getServerProfile } = await getProfile();

        /**
         * The current profile in session.
         */
        const profile = getServerProfile();

        // Search parameters in the url.
        const { searchParams } = new URL(req.url);

        /**
         * Server id from the search parameters in the url.
         */
        const serverId = searchParams.get(SearchParamsModel.SERVER_ID);

        // Get name and type channel form client.
        const { name, type } = await req.json();

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
         * Server: edit the channel on the server.
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
                    update: {
                        where: {
                            id: params.channelId,
                            NOT: {
                                name: APP_CHANNELS.GENERAL,
                            },
                        },
                        data: {
                            name,
                            type,
                        },
                    },
                },
            },
        });

        // Return the server with the channel deleted.
        return NextResponse.json(server);
    } catch (error) {
        console.log(ApiErrors.CHANNEL_ID_PATCH_ERROR, error);
        // Return an error response if there is an error.
        return new NextResponse(ApiErrors.INTERNAL_ERROR, {
            status: HTTP_CODE_ERRORS.INTERNAL_ERROR,
        });
    }
}

/**
 * Function to delete channel to server in database.
 *
 * @param { NextRequest } req - Next Request.
 *
 * @returns { Promise<NextResponse> } Response when delete channel to server in database.
 */
export async function DELETE(
    req: NextRequest,
    { params }: ParamsChannelId
): Promise<NextResponse> {
    try {
        const { getServerProfile } = await getProfile();

        /**
         * The current profile in session.
         */
        const profile = getServerProfile();

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

        /**
         * Server: delete the channel on the server.
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
                    delete: {
                        id: params.channelId,
                        name: {
                            not: APP_CHANNELS.GENERAL,
                        },
                    },
                },
            },
        });

        // Return the server with the channel deleted.
        return NextResponse.json(server);
    } catch (error) {
        console.log(ApiErrors.CHANNEL_ID_DELETE_ERROR, error);
        // Return an error response if there is an error.
        return new NextResponse(ApiErrors.INTERNAL_ERROR, {
            status: HTTP_CODE_ERRORS.INTERNAL_ERROR,
        });
    }
}
