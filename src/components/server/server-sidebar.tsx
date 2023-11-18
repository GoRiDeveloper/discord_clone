import { redirect } from 'next/navigation';
import type { FC, JSX } from 'react';
import { ChannelType } from '@prisma/client';

import { currentProfile, db } from '@/lib';
import { ServerHeader } from '@/components';

/**
 * Model for server sidebar component props.
 */
interface ServerSidebarProps {
    serverId: string;
}

/**
 * Server sidebar component.
 *
 * @param { ServerSidebarProps } param0 - Server sidebar component props.
 *
 * @returns { Promise<JSX.Element> } Server sidebar component.
 */
export const ServerSidebar: FC<ServerSidebarProps> = async ({
    serverId,
}: ServerSidebarProps): Promise<JSX.Element> => {
    /**
     * The current profile in session.
     */
    const profile = await currentProfile();

    // If there is no profile in session, redirect to main route.
    if (!profile) return redirect('/');

    /**
     * Server found.
     */
    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: 'asc',
                },
            },
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

    /**
     * Server text channels.
     */
    const textChannels = server?.channels.filter(
        (channel) => channel.type === ChannelType.TEXT
    );

    /**
     * Server audio channels.
     */
    const audioChannels = server?.channels.filter(
        (channel) => channel.type === ChannelType.AUDIO
    );

    /**
     * Server video channels.
     */
    const videoChannels = server?.channels.filter(
        (channel) => channel.type === ChannelType.VIDEO
    );

    /**
     * Server members.
     */
    const members = server?.members.filter(
        (member) => member.profileId !== profile.id
    );

    // If server not found, redirect to main route.
    if (!server) return redirect('/');

    /**
     * Check what role the profile has on the server.
     */
    const role = server.members.find(
        (member) => member.profileId === profile.id
    )?.role;

    return (
        <div
            className="
                flex flex-col h-full text-primary w-full dark:bg-[#2B2D31]
                bg-[#F2F3F5]
            "
        >
            <ServerHeader server={server} role={role} />
        </div>
    );
};
