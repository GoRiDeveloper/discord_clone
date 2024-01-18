'use client';

import type { ChannelType, MemberRole } from '@prisma/client';
import type { LucideIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { ReactElement } from 'react';

import { AppRoutes, roleIconMap } from '@/models';
import { channelIconMap } from '../models/icon-map.model';

/**
 * Model for use server channel props.
 */
interface UseMemberChannelProps {
    channelId?: string;
    channelType?: ChannelType;
    memberId?: string;
    memberRole?: MemberRole;
}

/**
 * Functional hook to switch to a server channel.
 *
 * @param { UseServerChannelProps } param0 - Use server channel props.
 */
export const useMemberChannel = ({
    channelId,
    channelType,
    memberId,
    memberRole,
}: UseMemberChannelProps) => {
    /**
     * App router hook.
     */
    const router = useRouter();

    /**
     * Url params hook.
     */
    const params = useParams();

    /**
     * Feature to redirect to a specific chat.
     */
    const onRouter = () => {
        router.push(
            channelType
                ? AppRoutes.CHANNEL_ID(params?.serverId, channelId)
                : AppRoutes.MEMBER_ID(params?.serverId, memberId)
        );
    };

    /**
     * Channel or member icon on the server.
     */
    let icon: ReactElement | LucideIcon | null = null;

    if (channelType) icon = channelIconMap[channelType];
    if (memberRole) icon = roleIconMap[memberRole];

    return { icon, params, onRouter };
};
