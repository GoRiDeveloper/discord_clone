import type { FC, JSX } from 'react';
import { InfiniteQueryObserverResult } from '@tanstack/react-query';

/**
 * Model for chat previous messages props.
 */
interface ChatPreviousMessagesProps {
    fetchNextPage: () => Promise<InfiniteQueryObserverResult<any, unknown>>;
}

/**
 * Chat previous messages component.
 *
 * @param { ChatPreviousMessagesProps } param0 - Chat previous messages props.
 *
 * @returns { JSX.Element } Chat previous messages component.
 */
export const ChatPreviousMessages: FC<ChatPreviousMessagesProps> = ({
    fetchNextPage,
}: ChatPreviousMessagesProps): JSX.Element => {
    return (
        <button
            className="
                dark:hover:text-zinc-300 dark:text-zinc-400 transition
                hover:text-zinc-600 text-zinc-500 text-xs my-4
            "
            onClick={() => fetchNextPage()}
        >
            Load previous messages
        </button>
    );
};
