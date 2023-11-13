import { currentProfile, db } from '@/lib';
import { MemberRole } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';

/**
 * Function to create server in database.
 *
 * @param { NextRequest } req - Next Request.
 *
 * @returns { Promise<NextResponse<any>> } Response when uploading the server in the database.
 */
export async function POST(req: NextRequest): Promise<NextResponse<any>> {
    try {
        // Destructure the server information from the client.
        const { name, imageUrl } = await req.json();

        /**
         * Save the reference of the current profile in session.
         */
        const profile = await currentProfile();

        // If there is no profile in session, return a non-authorization response.
        if (!profile) return new NextResponse('Unauthorized', { status: 401 });

        /**
         * Create the server in the database.
         */
        const server = await db.server.create({
            data: {
                profileId: profile.id,
                name,
                imageUrl,
                inviteCode: randomUUID(),
                channels: {
                    create: [{ name: 'general', profileId: profile.id }],
                },
                members: {
                    create: [
                        {
                            profileId: profile.id,
                            role: MemberRole.ADMIN,
                        },
                    ],
                },
            },
        });

        // Return the created server.
        return NextResponse.json(server);
    } catch (error) {
        console.error('[SERVERS_POST]' + error);
        // Return an error response if there is an error.
        return new NextResponse('Internal Error', { status: 500 });
    }
}
