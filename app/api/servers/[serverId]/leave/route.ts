import { NextRequest, NextResponse } from 'next/server';

import { currentProfile, db } from '@/lib';

/**
 * Patch leave user parameters.
 */
interface PatchParams {
    params: {
        serverId: string;
    };
}

/**
 * Function that updates the server without the user leaving the server.
 *
 * @param { NextRequest } req - Next Request.
 * @param { ParamsPatch } param1 - Patch parameters.
 *
 * @returns { Promise<NextResponse> } Response to update the server without the user leaving the server.
 */
export async function PATCH(
    req: NextRequest,
    { params }: PatchParams
): Promise<NextResponse> {
    try {
        /**
         * The current profile in session.
         */
        const profile = await currentProfile();

        // If there is no profile in session, return a non-authorization response.
        if (!profile) return new NextResponse('Unauthorized', { status: 401 });

        // If there is no server id, it returns a response that there is no server id..
        if (!params.serverId)
            return new NextResponse('Server ID Missing', { status: 400 });

        /**
         * Server without the user who exited the server.
         */
        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: {
                    not: profile.id,
                },
                members: {
                    some: {
                        profileId: profile.id,
                    },
                },
            },
            data: {
                members: {
                    deleteMany: {
                        profileId: profile.id,
                    },
                },
            },
        });

        // Return the server without the user who left the server.
        return NextResponse.json(server);
    } catch (error) {
        console.log('[SERVER_ID_LEAVE]', error);
        // Return an error response if there is an error.
        return new NextResponse('Internal Error', { status: 500 });
    }
}
