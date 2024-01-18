import type { FC, JSX } from 'react';

import { UserAvatar } from '@/components';

/**
 * Model for chat item avatar props.
 */
interface ChatItemAvatarProps {
    profileImgUrl: string;
    onMemberClick: () => void;
}

/**
 * Chat item avatar component.
 *
 * @param { ChatItemAvatarProps } param0 - Chat item avatar props.
 *
 * @returns { JSX.Element } Chat item avatar component.
 */
export const ChatItemAvatar: FC<ChatItemAvatarProps> = ({
    profileImgUrl,
    onMemberClick,
}: ChatItemAvatarProps): JSX.Element => {
    return (
        <button
            className="cursor-pointer hover:drop-shadow-md transition"
            onClick={onMemberClick}
        >
            <UserAvatar src={profileImgUrl} />
        </button>
    );
};
