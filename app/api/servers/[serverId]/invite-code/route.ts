import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';

import { getProfile, db } from '@/lib';
import { ApiErrors, HTTP_CODE_ERRORS } from '@/models';

/**
 * Patch invite code parameters.
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
    _req: NextRequest,
    { params }: ParamsPatch
): Promise<NextResponse> {
    try {
        const { getServerProfile } = await getProfile();

        /**
         * The current profile in session.
         */
        const profile = getServerProfile();

        // If there is no server id, it returns a response that there is no server id..
        if (!params.serverId)
            return new NextResponse(ApiErrors.SERVER_ID_MISSING, {
                status: HTTP_CODE_ERRORS.BAD_REQUEST,
            });

        /**
         * Update the server in the database.
         */
        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: (profile as any).id,
            },
            data: {
                inviteCode: randomUUID(),
            },
        });

        // Return the server with a new invitation code.
        return NextResponse.json(server);
    } catch (error) {
        console.error(ApiErrors.SERVER_ID, error);
        // Return an error response if there is an error.
        return new NextResponse(ApiErrors.INTERNAL_ERROR, {
            status: HTTP_CODE_ERRORS.INTERNAL_ERROR,
        });
    }
}
