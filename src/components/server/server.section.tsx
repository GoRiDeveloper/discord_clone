'use client';

import type { FC, JSX } from 'react';
import { MemberRole, ChannelType } from '@prisma/client';
import { Plus, Settings } from 'lucide-react';

import type { ServerWithMembersWithProfiles } from '@/types';
import { ActionTooltip } from '@/components/action-tooltip';
import { useModal } from '@/hooks';

/**
 * Model for server section props.
 */
interface ServerSectionProps {
    label: string;
    role?: MemberRole;
    sectionType: 'channels' | 'members';
    channelType?: ChannelType;
    server?: ServerWithMembersWithProfiles;
}

/**
 * Component server section.
 *
 * @param { ServerSectionProps } param0 - Server section props.
 *
 * @returns { JSX.Element } Component server section.
 */
export const ServerSection: FC<ServerSectionProps> = ({
    label,
    role,
    sectionType,
    server,
    channelType,
}: ServerSectionProps): JSX.Element => {
    // Functionality to open the modal.
    const { onOpen } = useModal();

    return (
        <div className="flex items-center justify-between py-2">
            <p className="text-xs uppercase font-semibol text-zinc-500 dark:text-zinc-400">
                {label}
            </p>
            {role !== MemberRole.GUEST && sectionType === 'channels' && (
                <ActionTooltip label="Create Channel" side="top">
                    <button
                        className="
                            text-zinc-500 hover:text-zinc-600 dark:text-zinc-400
                            dark:hover:text-zinc-300 transition
                        "
                        onClick={() => onOpen('createChannel', { channelType })}
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </ActionTooltip>
            )}
            {role === MemberRole.ADMIN && sectionType === 'members' && (
                <ActionTooltip label="Manage Members" side="top">
                    <button
                        className="
                            text-zinc-500 hover:text-zinc-600 dark:text-zinc-400
                            dark:hover:text-zinc-300 transition
                        "
                        onClick={() => onOpen('members', { server })}
                    >
                        <Settings className="w-4 h-4" />
                    </button>
                </ActionTooltip>
            )}
        </div>
    );
};
