import { NextRequest, NextResponse } from 'next/server';

import { getProfile, db } from '@/lib';
import { ApiErrors, HTTP_CODE_ERRORS } from '@/models';

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
    _req: NextRequest,
    { params }: PatchParams
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
         * Server without the user who exited the server.
         */
        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: {
                    not: (profile as any).id,
                },
                members: {
                    some: {
                        profileId: (profile as any).id,
                    },
                },
            },
            data: {
                members: {
                    deleteMany: {
                        profileId: (profile as any).id,
                    },
                },
            },
        });

        // Return the server without the user who left the server.
        return NextResponse.json(server);
    } catch (error) {
        console.error(ApiErrors.SERVER_ID_LEAVE, error);
        // Return an error response if there is an error.
        return new NextResponse(ApiErrors.INTERNAL_ERROR, {
            status: HTTP_CODE_ERRORS.INTERNAL_ERROR,
        });
    }
}
