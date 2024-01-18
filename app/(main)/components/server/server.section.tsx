'use client';

import { ChannelType, MemberRole } from '@prisma/client';
import { Plus, Settings } from 'lucide-react';
import type { FC, JSX } from 'react';

import { ModalTypeKeys } from '@/models';
import type { ServerWithMembersWithProfiles } from '@/types';
import { ServerSectionButton } from './';

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
    return (
        <div className="flex items-center justify-between py-2">
            <p className="text-xs uppercase font-semibol text-zinc-500 dark:text-zinc-400">
                {label}
            </p>
            {role !== MemberRole.GUEST && sectionType === 'channels' && (
                <ServerSectionButton
                    label="Create Channel"
                    modalType={ModalTypeKeys.CREATE_CHANNEL}
                    data={{ channelType }}
                    icon={Plus}
                />
            )}
            {role === MemberRole.ADMIN && sectionType === 'members' && (
                <ServerSectionButton
                    label="Manage Members"
                    modalType={ModalTypeKeys.MEMBERS}
                    data={{ server }}
                    icon={Settings}
                />
            )}
        </div>
    );
};
