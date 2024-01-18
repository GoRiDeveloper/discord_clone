import { redirect } from 'next/navigation';
import type { FC, JSX } from 'react';
import { redirectToSignIn } from '@clerk/nextjs';

import { db, getProfile } from '@/lib';
import { AppRoutes, APP_CHANNELS, BASE_URL } from '@/models';

/**
 * Server Id Page Props.
 */
interface ServerIdPageProps {
    params: {
        serverId: string;
    };
}

/**
 * Component to show a server by id.
 *
 * @returns { JSX.Element } Component to show a server by id.
 */
const ServerIdPage: FC<ServerIdPageProps> = async ({
    params,
}: ServerIdPageProps): Promise<JSX.Element | null> => {
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
     * Current server.
     */
    const server = await db.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    profileId: profile.id,
                },
            },
        },
        include: {
            channels: {
                where: {
                    name: 'general',
                },
                orderBy: {
                    createdAt: 'asc',
                },
            },
        },
    });

    /**
     * Server initial channel.
     */
    const initialChannel = server?.channels[0];

    /**
     *  If the channel found is not the general channel, return null.
     */
    if (initialChannel?.name !== APP_CHANNELS.GENERAL) return null;

    return redirect(AppRoutes.CHANNEL_ID(params?.serverId, initialChannel.id));
};

export default ServerIdPage;
