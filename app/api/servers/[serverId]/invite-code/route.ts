import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';

import { currentProfile, db } from '@/lib';

/**
 * Patch parameters.
 */
interface ParamsPatch {
    params: { serverId: string };
}

/**
 * Function to update the server invitation code.
 *
 * @param { NextRequest } req - Next Request.
 * @param { ParamsPatch } param1 - Patch parameters.
 *
 * @returns { Promise<NextResponse> } Response when updating the server invitation code.
 */
export async function PATCH(
    req: NextRequest,
    { params }: ParamsPatch
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
         * Create the server in the database.
         */
        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: profile.id,
            },
            data: {
                inviteCode: randomUUID(),
            },
        });

        // Return the server with a new invitation code.
        return NextResponse.json(server);
    } catch (error) {
        console.error('[SERVER_ID]', error);
        // Return an error response if there is an error.
        return new NextResponse('Internal Error', { status: 500 });
    }
}
