import { NextRequest, NextResponse } from 'next/server';

import { getProfile, db } from '@/lib';
import { ApiErrors, HTTP_CODE_ERRORS } from '@/models';

/**
 * Patch parameters.
 */
interface ServerIdParams {
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
    { params }: ServerIdParams
): Promise<NextResponse> {
    try {
        const { getServerProfile } = await getProfile();

        // The current profile in session.
        getServerProfile();

        // Destructure the client information to modify the server.
        const { name, imageUrl } = await req.json();

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
        console.error(ApiErrors.SERVER_ID_PATCH, error);
        // Return an error response if there is an error.
        return new NextResponse(ApiErrors.INTERNAL_ERROR, {
            status: HTTP_CODE_ERRORS.INTERNAL_ERROR,
        });
    }
}

/**
 * Delete server function.
 *
 * @param { NextRequest } req - Next Request.
 * @param { ParamsPatch } param1 - Patch parameters.
 *
 * @returns { Promise<NextResponse> } Response to server deletion.
 */
export async function DELETE(
    _req: NextRequest,
    { params }: ServerIdParams
): Promise<NextResponse> {
    try {
        const { getServerProfile } = await getProfile();

        /**
         * The current profile in session.
         */
        const profile = getServerProfile();

        /**
         * Delete the server in the database.
         */
        const server = await db.server.delete({
            where: {
                id: params.serverId,
                profileId: (profile as any).id,
            },
        });

        // Return a response from the deleted server.
        return NextResponse.json(server);
    } catch (error) {
        console.error(ApiErrors.DELETE_SERVER_ID_ERROR, error);
        // Return an error response if there is an error.
        return new NextResponse(ApiErrors.INTERNAL_ERROR, {
            status: HTTP_CODE_ERRORS.INTERNAL_ERROR,
        });
    }
}
