import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import type { FC, JSX, PropsWithChildren } from 'react';

import { ServerSidebar } from '@/components';
import { currentProfile, db } from '@/lib';

/**
 * Model for server id component props.
 */
interface ServerIdLayoutProps extends PropsWithChildren {
    params: { serverId: string };
}

/**
 * Server id component.
 *
 * @param { ServerIdLayoutProps } param0 - Server id component props.
 *
 * @returns { Promise<JSX.Element> } Server id component.
 */
const ServerIdLayout: FC<ServerIdLayoutProps> = async ({
    children,
    params,
}: ServerIdLayoutProps): Promise<JSX.Element> => {
    /**
     * The current profile in session.
     */
    const profile = await currentProfile();

    // If there is no profile in session, return a non-authorization response.
    if (!profile) return redirectToSignIn();

    /**
     * Server found.
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
    });

    // If the server was not found, redirect to the main route.
    if (!server) return redirect('/');

    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
                <ServerSidebar serverId={params.serverId} />
            </div>
            <main className="h-full md:pl-60">{children}</main>
        </div>
    );
};

export default ServerIdLayout;
