'use client';

import { Member, MemberRole, Profile, Server } from '@prisma/client';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import type { FC, JSX } from 'react';

import { UserAvatar } from '@/components';
import { cn } from '@/lib';

/**
 * Model for Server Member Props.
 */
interface ServerMemberProps {
    member: Member & { profile: Profile };
    server: Server;
}

/**
 * Role icons.
 */
const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="w-4 h-4 text-indigo-500" />,
    [MemberRole.ADMIN]: <ShieldAlert className="w-4 h-4 text-rose-500" />,
};

/**
 * Member component on server.
 *
 * @param { ServerMemberProps } param0 - Member component on server props.
 *
 * @returns { JSX.Element } Member component on server.
 */
export const ServerMember: FC<ServerMemberProps> = ({
    member,
    server,
}: ServerMemberProps): JSX.Element => {
    /**
     * App router.
     */
    const router = useRouter();

    /**
     * Url page params.
     */
    const params = useParams();

    /**
     * Member icon.
     */
    const Icon = roleIconMap[member.role];

    return (
        <button
            className={cn(
                'group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover: bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1',
                params?.memberId === member.id &&
                    'bg-zinc-700/20 dark:bg-zinc-700'
            )}
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
