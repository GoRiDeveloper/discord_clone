import type { FC, JSX } from 'react';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib';

/**
 * Model for chat item edited props.
 */
interface ChatItemEditedProps {
    deleted: boolean;
    content: string;
    isUpdated: boolean;
    isLoading: boolean;
}

/**
 * Chat item edited component.
 *
 * @param { ChatItemEditedProps } param0 - Chat item edited props.
 *
 * @returns { JSX.Element } Chat item edited component.
 */
export const ChatItemEdited: FC<ChatItemEditedProps> = ({
    deleted,
    content,
    isUpdated,
    isLoading,
}: ChatItemEditedProps): JSX.Element => {
    return (
        <p
            className={cn(
                'text-sm text-zinc-600 dark:text-zinc-300',
                deleted && 'italic text-zinc darktext-zinc-400 text-xs mt-1'
            )}
        >
            {content}
            {isLoading && (
                <Loader2
                    className="
                        absolute right-10 animate-spin
                        text-zinc h-6 w-6 top-7
                    "
                />
            )}
            {isUpdated && !deleted && (
                <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                    (edited)
                </span>
            )}
        </p>
    );
};
