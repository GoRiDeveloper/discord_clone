import { Hash } from 'lucide-react';
import type { FC, JSX } from 'react';

import { MobileToggle, SocketIndicator, UserAvatar } from '@/components';
import { ChatVideoButton } from './chat-video.button';

/**
 * Chat type model.
 */
type ChatType = 'channel' | 'conversation';

/**
 * Chat Header Props Model.
 */
interface ChatHeaderProps {
    serverId: string;
    name: string;
    type: ChatType;
    imageUrl?: string;
}

/**
 * Chat Header Component.
 *
 * @returns { JSX.Element } Chat Header Component.
 */
export const ChatHeader: FC<ChatHeaderProps> = ({
    serverId,
    name,
    type,
    imageUrl,
}: ChatHeaderProps): JSX.Element => {
    return (
        <div
            className="
                text-md font-semibold px-3 flex items-center h-12
                border-neutral-200 dark:border-neutral-800 border-b-2
            "
        >
            <MobileToggle serverId={serverId} />
            {type === 'channel' && (
                <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
            )}
            {type === 'conversation' && (
                <UserAvatar className="w-8 h-8 md:h-8 mr-2" src={imageUrl} />
            )}
            <p className="font-semibold text-md text-black dark:text-white">
                {name}
            </p>
            <div className="ml-auto flex items-center">
                {type === 'conversation' && <ChatVideoButton />}
                <SocketIndicator />
            </div>
        </div>
    );
};
