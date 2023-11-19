import { NextRequest, NextResponse } from 'next/server';

import { currentProfile, db } from '@/lib';

/**
 * Patch parameters.
 */
interface ParamsPatch {
    params: { serverId: string };
}

/**
 * Function to update server.
 *
 * @param { NextRequest } req - Next Request.
 * @param { ParamsPatch } param1 - Patch parameters.
 *
 * @returns { Promise<NextResponse> } Response with updated server.
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
        // Destructure the client information to modify the server.
        const { name, imageUrl } = await req.json();

        // If there is no profile in session, return a non-authorization response.
        if (!profile) return new NextResponse('Unauthorized', { status: 401 });

        /**
         * Update the server in the database.
         */
        const server = await db.server.update({
            where: {
                id: params.serverId,
            },
            data: {
                name,
                imageUrl,
            },
        });

        // Return the server updated.
        return NextResponse.json(server);
    } catch (error) {
        console.error('[SERVER_ID_PATCH]', error);
        // Return an error response if there is an error.
        return new NextResponse('Internal Error', { status: 500 });
    }
}
