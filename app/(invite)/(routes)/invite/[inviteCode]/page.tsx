import { redirect } from 'next/navigation';
import type { FC } from 'react';

import { db, getAuthProfile } from '@/lib';
import { redirectToSpecificServer } from '@/lib/server';

/**
 * Props for invitation code page.
 */
interface InviteCodePageProps {
    params: {
        inviteCode: string;
    };
}

/**
 * Invite code page.
 *
 * @param { InviteCodePageProps } param0 - Invite code page props.
 *
 * @returns { Promise<JSX.Element> } Invite code page.
 */
const InviteCodePage: FC<InviteCodePageProps> = async ({
    params,
}: InviteCodePageProps): Promise<null | never> => {
    /**
     * The current profile in session.
     */
    const profile = await getAuthProfile();

    // If there is no server id, redirect to main page.
    if (!params.inviteCode) return redirect('/');

    /**
     * Found server where the user is as a member.
     */
    const existingServer = await db.server.findFirst({
        where: {
            inviteCode: params.inviteCode,
            members: {
                some: {
                    profileId: profile.id,
                },
            },
        },
    });

    // If the server where the user is as a member was found, return the found server.
    if (existingServer) return redirect(`/servers/${existingServer.id}`);

    redirectToSpecificServer({
        inviteCode: params.inviteCode,
        profileId: profile.id,
        inviteCodeRedirect: true,
    });

    return null;
};

export default InviteCodePage;
