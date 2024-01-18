'use server';

import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { db, getProfile } from '@/lib';
import { AppRoutes, BASE_URL } from '@/models';

/**
 * Server id hook props model.
 */
interface UseServerIdProps {
    serverId: string;
}

/**
 * Server id page logic hook.
 *
 * @param { UseServerIdProps } param0 - Server id hook props
 *
 * @returns { Promise<void | never> } Functionality to verify the existence of the server, and redirect if it does not exist.
 */
export const useServerId = async ({
    serverId,
}: UseServerIdProps): Promise<void | never> => {
    const { getAuthProfile } = await getProfile();

    /**
     * The current profile in session.
     */
    const profile = getAuthProfile();

    // Check if the profile exists, if not, redirect to authenticate.
    if (!profile) {
        return redirectToSignIn({
            returnBackUrl: BASE_URL,
        });
    }

    /**
     * Server found.
     */
    const server = await db.server.findUnique({
        where: {
            id: serverId,
            members: {
                some: {
                    profileId: profile.id,
                },
            },
        },
    });

    // If the server was not found, redirect to the main route.
    if (!server) return redirect(AppRoutes.HOME);
};
