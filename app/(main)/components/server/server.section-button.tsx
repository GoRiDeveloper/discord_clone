'use client';

import type { ChannelType } from '@prisma/client';
import type { LucideIcon } from 'lucide-react';
import type { FC, JSX } from 'react';

import { ActionTooltip } from '@/components';
import { useModal } from '@/hooks';
import { ModalType, type ModalTypeProps } from '@/models';
import type { ServerWithMembersWithProfiles } from '@/types';

/**
 * Model for channel or server type.
 */
interface ChannelServerProps {
    channelType?: ChannelType;
    server?: ServerWithMembersWithProfiles;
}

/**
 * Model for server section button props.
 */
interface ServerSectionButtonProps extends ModalTypeProps {
    label: string;
    data: ChannelServerProps;
    channelType?: ChannelType;
    icon: LucideIcon;
}

/**
 * Server section button component.
 *
 * @param { ServerSectionButtonProps } param0 - Server section button props.
 *
 * @returns { JSX.Element } Server section button component.
 */
export const ServerSectionButton: FC<ServerSectionButtonProps> = ({
    label,
    data,
    modalType,
    icon: Icon,
}: ServerSectionButtonProps): JSX.Element => {
    // Functionality to open the modal.
    const { onOpen } = useModal();

    return (
        <ActionTooltip label={label} side="top">
            <button
                className="
                    text-zinc-500 hover:text-zinc-600 dark:text-zinc-400
                    dark:hover:text-zinc-300 transition
                "
                onClick={() => onOpen(ModalType[modalType], data)}
            >
                <Icon className="w-4 h-4" />
            </button>
        </ActionTooltip>
    );
};
