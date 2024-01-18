import { NextRequest, NextResponse } from 'next/server';

import { getProfile, db } from '@/lib';
import { ApiErrors, SearchParamsModel, HTTP_CODE_ERRORS } from '@/models';

/**
 * Patch member parameters.
 */
interface ParamsMemberId {
    params: { memberId: string };
}

/**
 * Function to delete a user from the server in the database.
 *
 * @param { NextRequest } req - Next Request.
 * @param { ParamsPatch } param1 - Patch parameters.
 *
 * @returns { Promise<NextResponse> } Response to delete a user from the server in the database.
 */
export async function DELETE(
    req: NextRequest,
    { params }: ParamsMemberId
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

        // If there is no member id, it returns a response that there is no member id.
        if (!params.memberId)
            return new NextResponse(ApiErrors.MEMBER_ID_MISSING, {
                status: HTTP_CODE_ERRORS.BAD_REQUEST,
            });

        /**
         *  Update members on server in database.
         */
        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: (profile as any).id,
            },
            data: {
                members: {
                    deleteMany: {
                        id: params.memberId,
                        profileId: {
                            not: (profile as any).id,
                        },
                    },
                },
            },
            include: {
                members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        role: 'asc',
                    },
                },
            },
        });

        // Return the server with the member's updated.
        return NextResponse.json(server);
    } catch (error) {
        console.error(ApiErrors.MEMBER_ID_DELETE, error);
        // Return an error response if there is an error.
        return new NextResponse(ApiErrors.INTERNAL_ERROR, {
            status: HTTP_CODE_ERRORS.INTERNAL_ERROR,
        });
    }
}

/**
 * Function to update the role of a member on a server.
 *
 * @param { NextRequest } req - Next Request.
 * @param { ParamsPatch } param1 - Patch parameters.
 *
 * @returns { Promise<NextResponse> } Response to update a member's role on a server.
 */
export async function PATCH(
    req: NextRequest,
    { params }: ParamsMemberId
): Promise<NextResponse> {
    try {
        const { getServerProfile } = await getProfile();

        /**
         * The current profile in session.
         */
        const profile = getServerProfile();

        // Search parameters in the url.
        const { searchParams } = new URL(req.url);

        // Get the role from the body of the request.
        const { role } = await req.json();

        /**
         * Server id from the search parameters in the url.
         */
        const serverId = searchParams.get(SearchParamsModel.SERVER_ID);

        // If there is no server id, it returns a response that there is no server id.
        if (!serverId)
            return new NextResponse(ApiErrors.SERVER_ID_MISSING, {
                status: HTTP_CODE_ERRORS.BAD_REQUEST,
            });

        // If there is no member id, it returns a response that there is no member id.
        if (!params.memberId)
            return new NextResponse(ApiErrors.MEMBER_ID_MISSING, {
                status: HTTP_CODE_ERRORS.BAD_REQUEST,
            });

        /**
         * Update member role on server in database.
         */
        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: (profile as any).id,
            },
            data: {
                members: {
                    update: {
                        where: {
                            id: params.memberId,
                            profileId: {
                                not: (profile as any).id,
                            },
                        },
                        data: {
                            role,
                        },
                    },
                },
            },
            include: {
                members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        role: 'asc',
                    },
                },
            },
        });

        // Return the server with the member with it's updated role.
        return NextResponse.json(server);
    } catch (error) {
        console.error(ApiErrors.MEMBERS_ID_PATCH, error);
        // Return an error response if there is an error.
        return new NextResponse(ApiErrors.INTERNAL_ERROR, {
            status: HTTP_CODE_ERRORS.INTERNAL_ERROR,
        });
    }
}
