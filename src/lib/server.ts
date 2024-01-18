import { redirect } from 'next/navigation';

import { db } from '@/lib';
import { AppRoutes } from '@/models';

/**
 * Model for the function of directing a specific server.
 */
interface RedirectToSpecificServerProps {
    inviteCode?: string;
    profileId: string;
    inviteCodeRedirect: boolean;
}

/**
 * Function to redirect to a specific server based on the parameters of that server.
 *
 * @param { RedirectToSpecificServerProps } param0 - Redirect props to a server.
 *
 * @returns { Promise<void | never> } If the server exists, redirect to this specific server.
 */
export const redirectToSpecificServer = async ({
    inviteCode,
    profileId,
    inviteCodeRedirect,
}: RedirectToSpecificServerProps): Promise<void | never> => {
    /**
     * Server found.
     */
    let server;

    if (inviteCodeRedirect) {
        server = await db.server.update({
            where: {
                inviteCode: inviteCode,
            },
            data: {
                members: {
                    create: [
                        {
                            profileId: profileId,
                        },
                    ],
                },
            },
        });
    } else {
        server = await db.server.findFirst({
            where: {
                members: {
                    some: {
                        profileId,
                    },
                },
            },
        });
    }

    // If the invitation code server or found server, return the found server.
    if (server) return redirect(AppRoutes.SERVER_ID(server.id));
};
