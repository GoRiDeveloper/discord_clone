import type { FC, JSX } from 'react';
import { Hash } from 'lucide-react';

import { MobileToggle } from '@/components';

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
            <p className="font-semibold text-md text-black dark">{name}</p>
        </div>
    );
};