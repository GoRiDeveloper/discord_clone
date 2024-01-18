'use client';

import { MemberRole } from '@prisma/client';
import {
    LogOut,
    PlusCircle,
    Settings,
    Trash,
    UserPlus,
    Users,
} from 'lucide-react';
import type { FC, JSX } from 'react';

import { DropdownMenuContent, DropdownMenuItem } from '@/components';
import { ModalTypeKeys } from '@/models';
import { ServerOption } from './';
import { ServerInfoProps } from '../../models';

/**
 * Server header options component.
 *
 * @param {ServerIdParams} param0 - Server id params props.
 *
 * @returns { Promise<JSX.Element> } Server header options component.
 */
export const ServerHeaderOptions: FC<ServerInfoProps> = ({
    server,
    userRole,
}: ServerInfoProps): JSX.Element => {
    /**
     * The profile is admin?.
     */
    const isAdmin = userRole === MemberRole.ADMIN;

    /**
     * The profile is moderator?.
     */
    const isModerator = isAdmin || userRole === MemberRole.MODERATOR;

    return (
        <DropdownMenuContent
            className="
                w-56 text-xs font-medium text-black dark:text-neutral-400
                space-y-[2px]
            "
        >
            {isModerator && (
                <ServerOption
                    title="Invite People"
                    addClass="text-indigo-600 dark:text-indigo-400"
                    modalType={ModalTypeKeys.INVITE}
                    server={server}
                    Icon={UserPlus}
                />
            )}
            {isAdmin && (
                <ServerOption
                    title="Server Settings"
                    modalType={ModalTypeKeys.EDIT_SERVER}
                    server={server}
                    Icon={Settings}
                />
            )}
            {isAdmin && (
                <ServerOption
                    title="Manage Members"
                    modalType={ModalTypeKeys.MEMBERS}
                    server={server}
                    Icon={Users}
                />
            )}
            {isModerator && (
                <ServerOption
                    title="Create Channel"
                    modalType={ModalTypeKeys.CREATE_CHANNEL}
                    server={server}
                    Icon={PlusCircle}
                />
            )}
            {isModerator && <DropdownMenuItem />}
            {isAdmin && (
                <ServerOption
                    title="Delete Server"
                    addClass="text-rose-500"
                    modalType={ModalTypeKeys.DELETE_SERVER}
                    server={server}
                    Icon={Trash}
                />
            )}
            {!isAdmin && (
                <ServerOption
                    title="Leave Server"
                    addClass="text-rose-500"
                    modalType={ModalTypeKeys.LEAVE_SERVER}
                    server={server}
                    Icon={LogOut}
                />
            )}
        </DropdownMenuContent>
    );
};
