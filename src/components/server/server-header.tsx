'use client';

import { MemberRole } from '@prisma/client';
import {
    ChevronDown,
    Settings,
    UserPlus,
    Users,
    PlusCircle,
    Trash,
    LogOut,
} from 'lucide-react';
import type { FC, JSX } from 'react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components';
import type { ServerWithMembersWithProfiles } from '@/types';
import { useModal } from '@/hooks';

/**
 * Model for server header props component.
 */
interface ServerHeaderProps {
    server: ServerWithMembersWithProfiles;
    role?: MemberRole;
}

/**
 * Server header component.
 *
 * @param { ServerHeaderProps } param0 - Server header component props.
 *
 * @returns { JSX.Element } Server header component.
 */
export const ServerHeader: FC<ServerHeaderProps> = ({
    server,
    role,
}: ServerHeaderProps): JSX.Element => {
    // Function to activate a modal.
    const { onOpen } = useModal();

    /**
     * The profile is admin?.
     */
    const isAdmin = role === MemberRole.ADMIN;

    /**
     * The profile is moderator?.
     */
    const isModerator = isAdmin || role === MemberRole.MODERATOR;

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
                    {server.name}
                    <ChevronDown className="h-5 w-5 ml-auto" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="
                    w-56 text-xs font-medium text-black dark:text-neutral-400
                    space-y-[2px]
                "
            >
                {isModerator && (
                    <DropdownMenuItem
                        className="
                            text-indigo-600 dark:text-indigo-400 px-3 py-2
                            text-sm cursor-pointer
                        "
                        onClick={() => onOpen('invite', { server })}
                    >
                        {' '}
                        Invite People <UserPlus className="w-4 h-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
                        {' '}
                        Server Settings <Settings className="w-4 h-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
                        {' '}
                        Manage Members <Users className="w-4 h-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
                        {' '}
                        Create Channel{' '}
                        <PlusCircle className="w-4 h-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isModerator && <DropdownMenuItem />}
                {isAdmin && (
                    <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
                        {' '}
                        Delete Server <Trash className="w-4 h-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {!isAdmin && (
                    <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
                        Leave Server <LogOut className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
