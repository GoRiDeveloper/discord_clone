'use client';

import { ChevronDown } from 'lucide-react';
import type { FC, JSX } from 'react';

import { DropdownMenu, DropdownMenuTrigger } from '@/components';
import { ServerInfoProps } from '../../models';
import { ServerHeaderOptions } from './';

/**
 * Server header component.
 *
 * @param { ServerHeaderProps } param0 - Server header component props.
 *
 * @returns { JSX.Element } Server header component.
 */
export const ServerHeader: FC<ServerInfoProps> = ({
    server,
    userRole,
}: ServerInfoProps): JSX.Element => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none" asChild>
                <button
                    className="
                        w-full text-md font-semibold px-3 flex items-center h-12
                        border-neutral-200 dark:border-neutral-800 border-b-2
                        hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition
                    "
                >
                    {server?.name}
                    <ChevronDown className="h-5 w-5 ml-auto" />
                </button>
            </DropdownMenuTrigger>
            <ServerHeaderOptions server={server} userRole={userRole} />
        </DropdownMenu>
    );
};
