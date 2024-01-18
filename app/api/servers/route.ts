import { MemberRole } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';

import { getProfile, db } from '@/lib';
import { ApiErrors, APP_CHANNELS, HTTP_CODE_ERRORS } from '@/models';

/**
 * Function to create server in database.
 *
 * @param { NextRequest } req - Next Request.
 *
 * @returns { Promise<NextResponse> } Response when uploading the server in the database.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        // Destructure the server information from the client.
        const { name, imageUrl } = await req.json();

        const { getServerProfile } = await getProfile();

        /**
         * The current profile in session.
         */
        const profile = getServerProfile();

        /**
         * Create the server in the database.
         */
        const server = await db.server.create({
            data: {
                profileId: (profile as any).id,
                name,
                imageUrl,
                inviteCode: randomUUID(),
                channels: {
                    create: [
                        {
                            name: APP_CHANNELS.GENERAL,
                            profileId: (profile as any).id,
                        },
                    ],
                },
                members: {
                    create: [
                        {
                            profileId: (profile as any).id,
                            role: MemberRole.ADMIN,
                        },
                    ],
                },
            },
        });

        // Return the created server.
        return NextResponse.json(server);
    } catch (error) {
        console.error(ApiErrors.SERVERS_POST + error);
        // Return an error response if there is an error.
        return new NextResponse(ApiErrors.INTERNAL_ERROR, {
            status: HTTP_CODE_ERRORS.INTERNAL_ERROR,
        });
    }
}
