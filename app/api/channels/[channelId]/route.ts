import { MemberRole } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { currentProfile, db } from '@/lib';

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
export async function PATCH(req: NextRequest, { params }: ParamsChannelId) {
    try {
        /**
         * The current profile in session.
         */
        const profile = await currentProfile();

        // Search parameters in the url.
        const { searchParams } = new URL(req.url);

        /**
         * Server id from the search parameters in the url.
         */
        const serverId = searchParams.get('serverId');

        // Get name and type channel form client.
        const { name, type } = await req.json();

        // If there is no profile in session, return a non-authorization response.
        if (!profile) return new NextResponse('Unauthorized', { status: 401 });

        // If there is no server id, it returns a response that there is no server id.
        if (!serverId)
            return new NextResponse('Server ID missing', { status: 400 });

        // if the name is "general", we return an error since the name cannot be "general".
        if (name === 'general')
            return new NextResponse('Name cannot be "general"', {
                status: 400,
            });

        /**
         * Server: edit the channel on the server.
         */
        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
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
                                name: 'general',
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
        console.log('[CHANNEL_ID_PATCH]', error);
        // Return an error response if there is an error.
        return new NextResponse('Internal Error', { status: 500 });
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
        /**
         * The current profile in session.
         */
        const profile = await currentProfile();

        // Search parameters in the url.
        const { searchParams } = new URL(req.url);

        /**
         * Server id from the search parameters in the url.
         */
        const serverId = searchParams.get('serverId');

        // If there is no server id, it returns a response that there is no server id.
        if (!serverId)
            return new NextResponse('Server ID missing', { status: 400 });

        // If there is no profile in session, return a non-authorization response.
        if (!profile) return new NextResponse('Unauthorized', { status: 401 });

        /**
         * Server: delete the channel on the server.
         */
        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
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
                            not: 'general',
                        },
                    },
                },
            },
        });

        // Return the server with the channel deleted.
        return NextResponse.json(server);
    } catch (error) {
        console.log('[CHANNEL_ID_DELETE]', error);
        // Return an error response if there is an error.
        return new NextResponse('Internal Error', { status: 500 });
    }
}
