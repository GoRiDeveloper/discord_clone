'use client';

import { Member, Profile } from '@prisma/client';
import type { FC, JSX, ReactElement } from 'react';

import { useMemberChannel } from '../../hooks';
import { UserAvatar } from '@/components';
import { cn } from '@/lib';

/**
 * Model for Server Member Props.
 */
interface ServerMemberProps {
    member: Member & { profile: Profile };
}

/**
 * Member component on server.
 *
 * @param { ServerMemberProps } param0 - Member component on server props.
 *
 * @returns { JSX.Element } Member component on server.
 */
export const ServerMember: FC<ServerMemberProps> = ({
    member,
}: ServerMemberProps): JSX.Element => {
    const { icon, params, onRouter } = useMemberChannel({
        memberId: member.id,
        memberRole: member.role,
    });

    const Icon = icon as ReactElement;

    return (
        <button
            className={cn(
                'group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover: bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1',
                params?.memberId === member.id &&
                    'bg-zinc-700/20 dark:bg-zinc-700'
            )}
            onClick={onRouter}
        >
            <UserAvatar
                className="w-8 h-8 md:w-8 md:h-8"
                src={member.profile.imageUrl}
            />
            <p
                className={cn(
                    'font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition',
                    params?.channelId === member.id &&
                        'text-primary dark:text-zinc-200 dark:group-hover:text-white'
                )}
            >
                {' '}
                {member.profile.name}
            </p>
            {Icon}
        </button>
    );
};
