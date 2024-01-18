import { ChannelType, MemberRole } from '@prisma/client';
import { redirect } from 'next/navigation';

import { db, getProfile } from '@/lib';
import { AppRoutes, ChannelsTypes, roleIconMap } from '@/models';
import { iconMap } from '../models';

/**
 * Function to get information from a specific server.
 *
 * @param { GetServerInfoProps } param0 - get server info props.
 */
export const getServerInfo = async (serverId: string) => {
    const { getProfileOrRedirect } = await getProfile();

    const profile = getProfileOrRedirect();

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
    if (!server) return redirect(AppRoutes.HOME);

    /**
     * Check what role the profile has on the server.
     */
    const userRole = server.members.find(
        (member) => member.profileId === profile.id
    )?.role as MemberRole;

    const serverData = [
        {
            label: 'Text Channels',
            type: ChannelsTypes.channel,
            data: textChannels?.map((channel) => ({
                id: channel.id,
                name: channel.name,
                icon: iconMap[channel.type],
            })),
        },
        {
            label: 'Voice Channels',
            type: ChannelsTypes.channel,
            data: audioChannels?.map((channel) => ({
                id: channel.id,
                name: channel.name,
                icon: iconMap[channel.type],
            })),
        },
        {
            label: 'Video Channels',
            type: ChannelsTypes.channel,
            data: videoChannels?.map((channel) => ({
                id: channel.id,
                name: channel.name,
                icon: iconMap[channel.type],
            })),
        },
        {
            label: 'Members',
            type: ChannelsTypes.member,
            data: members?.map((member) => ({
                id: member.id,
                name: member.profile.name,
                icon: roleIconMap[member.role],
            })),
        },
    ];

    return {
        server,
        serverInfo: {
            serverData,
            textChannels,
            audioChannels,
            videoChannels,
            members,
            userRole,
        },
    };
};
