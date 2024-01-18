import { MemberRole } from '@prisma/client';
import type { FC, JSX } from 'react';

import { ActionTooltip } from '@/components';
import { roleIconMap } from '@/models';

/**
 * Model for chat item user info props.
 */
interface ChatItemUserInfoProps {
    onMemberClick: () => void;
    profileName: string;
    profileRole: MemberRole;
    timestamp: string;
}

/**
 * Chat item user info component.
 *
 * @param { ChatItemUserInfoProps } param0 - Chat item user info props.
 *
 * @returns { JSX.Element } Chat item user info component.
 */
export const ChatItemUserInfo: FC<ChatItemUserInfoProps> = ({
    profileName,
    profileRole,
    timestamp,
    onMemberClick,
}: ChatItemUserInfoProps): JSX.Element => {
    return (
        <div className="flex items-center gap-x-2">
            <div className="flex items-center">
                <button
                    className="font-semibold text-sm hoverunderline cursor-pointer"
                    onClick={onMemberClick}
                >
                    {profileName}
                </button>
                <ActionTooltip label={profileRole}>
                    {roleIconMap[profileRole]}
                </ActionTooltip>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {timestamp}
            </span>
        </div>
    );
};
