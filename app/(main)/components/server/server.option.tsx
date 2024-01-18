'use client';

import type { FC, JSX } from 'react';
import type { Server } from '@prisma/client';

import { DropdownMenuItem } from '@/components';
import { useModal } from '@/hooks';
import { ModalType } from '@/models';
import type { ServerHeaderOptionsProps } from '../../models';

/**
 * Server option component.
 *
 * @param { ServerHeaderOptionsProps } param0 - Server header options props.
 *
 * @returns { JSX.Element } Server option component.
 */
export const ServerOption: FC<ServerHeaderOptionsProps> = ({
    Icon,
    modalType,
    server,
    title,
    addClass,
}: ServerHeaderOptionsProps): JSX.Element => {
    // Function to activate a modal.
    const { onOpen } = useModal();

    return (
        <DropdownMenuItem
            className={`${
                addClass ? addClass : ''
            } px-3 py-2 text-sm cursor-pointer`}
            onClick={() =>
                onOpen(ModalType[modalType], { server: server as Server })
            }
        >
            {' '}
            {title} <Icon className="w-4 h-4 ml-auto" />
        </DropdownMenuItem>
    );
};
