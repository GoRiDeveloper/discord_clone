import type { FC, JSX } from 'react';
import { redirect } from 'next/navigation';
import { redirectToSignIn } from '@clerk/nextjs';

import { currentProfile, db } from '@/lib';

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
    /**
     * The current profile in session.
     */
    const profile = await currentProfile();

    // If there is no profile in session, return a non-authorization response.
    if (!profile) return redirectToSignIn();

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
     * If the channel found is not the general channel, return null.
     */
    if (initialChannel?.name !== 'general') return null;

    return redirect(
        `/servers/${params?.serverId}/channels/${initialChannel.id}`
    );
};

export default ServerIdPage;
