import { NextRequest, NextResponse } from 'next/server';
import { MemberRole } from '@prisma/client';

import { currentProfile, db } from '@/lib';

/**
 * Function to add channel to server in database.
 *
 * @param { NextRequest } req - Next Request.
 *
 * @returns { Promise<NextResponse> } Response when adding channel to server in database.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        /**
         * The current profile in session.
         */
        const profile = await currentProfile();

        // Get name and type channel form client.
        const { name, type } = await req.json();

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

        // if the name is "general", we return an error since the name cannot be "general".
        if (name === 'general')
            return new NextResponse('Name cannot be "general"', {
                status: 400,
            });

        /**
         * Server: adding the channel on the server.
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
                    create: {
                        profileId: profile.id,
                        name,
                        type,
                    },
                },
            },
        });

        // Return the server with the channel added.
        return NextResponse.json(server);
    } catch (error) {
        console.log('CHANNELS_POST', error);
        // Return an error response if there is an error.
        return new NextResponse('Internal Error', { status: 500 });
    }
}
