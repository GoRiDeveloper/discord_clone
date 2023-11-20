import { NextRequest, NextResponse } from 'next/server';

import { currentProfile, db } from '@/lib';

/**
 * Patch member parameters.
 */
interface ParamsPatch {
    params: { memberId: string };
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
    { params }: ParamsPatch
): Promise<NextResponse> {
    try {
        /**
         * The current profile in session.
         */
        const profile = await currentProfile();

        // Search parameters in the url.
        const { searchParams } = new URL(req.url);

        // Get the role from the body of the request.
        const { role } = await req.json();

        /**
         * Server id from the search parameters in the url.
         */
        const serverId = searchParams.get('serverId');

        // If there is no profile in session, return a non-authorization response.
        if (!profile) return new NextResponse('Unauthorized', { status: 401 });

        // If there is no server id, it returns a response that there is no server id.
        if (!serverId)
            return new NextResponse('Server ID missing', { status: 400 });

        // If there is no member id, it returns a response that there is no member id.
        if (!params.memberId)
            return new NextResponse('Member ID missing', { status: 400 });

        /**
         * Update member role on server in database.
         */
        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id,
            },
            data: {
                members: {
                    update: {
                        where: {
                            id: params.memberId,
                            profileId: {
                                not: profile.id,
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
        console.log('[MEMBERS_ID_PATCH]', error);
        // Return an error response if there is an error.
        return new NextResponse('Internal Error', { status: 500 });
    }
}
