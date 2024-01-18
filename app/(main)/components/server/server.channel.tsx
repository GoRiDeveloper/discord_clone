'use client';

import { MemberRole } from '@prisma/client';
import { Lock, type LucideIcon } from 'lucide-react';
import type { FC, JSX } from 'react';

import { APP_CHANNELS } from '@/models';
import { ServerChannelOptions } from './';
import type { ServerChannelProps } from '../../models';
import { useMemberChannel } from '../../hooks';
import { cn } from '@/lib';

/**
 * Model channel properties on server.
 */
interface IServerChannel extends ServerChannelProps {
    role?: MemberRole;
}

/**
 * Channel component on server.
 *
 * @param { ServerChannelProps } param0 - Channel props on server.
 *
 * @returns { JSX.Element } Channel component on server.
 */
export const ServerChannel: FC<IServerChannel> = ({
    channel,
    server,
    role,
}: IServerChannel): JSX.Element => {
    const { icon, params, onRouter } = useMemberChannel({
        channelId: channel.id,
        channelType: channel.type,
    });

    const Icon = icon as LucideIcon;

    return (
        <button
            className={cn(
                'group px-2 py-2 rounded-md flex items-center w-full gap-x-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1',
                params?.channelId === channel.id &&
                    'bg-zinc-700/20 dark:bg-zinc-700'
            )}
            onClick={onRouter}
        >
            {Icon && (
                <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
            )}
            <p
                className={cn(
                    'line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition',
                    params?.channelId === channel.id &&
                        'text-primary dark:text-zinc-200 dark:group-hover:text-white'
                )}
            >
                {channel.name}
            </p>
            {channel.name !== APP_CHANNELS.GENERAL &&
                role !== MemberRole.GUEST && (
                    <ServerChannelOptions server={server} channel={channel} />
                )}
            {channel.name === APP_CHANNELS.GENERAL && (
                <Lock className="ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400" />
            )}
        </button>
    );
};
