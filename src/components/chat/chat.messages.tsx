import type { FC, JSX } from 'react';
import { Member } from '@prisma/client';
import { useParams } from 'next/navigation';
import { Loader2, ServerCrash } from 'lucide-react';

import { ChatWelcome } from '@/components';
import { useChatQuery } from '@/hooks';

/**
 * Model for chat messages props.
 */
interface ChatMessagesProps {
    name: string;
    member: Member;
    chatId: string;
    apiUrl: string;
    socketUrl: string;
    paramValue: string;
    socketQuery: Record<string, string>;
    type: 'channel' | 'conversation';
    paramKey: 'channelId' | 'conversationId';
}

/**
 * Chat messages component.
 *
 * @param { ChatMessagesProps } param0 - Chat messages props.
 *
 * @returns { JSX.Element } Chat messages component.
 */
export const ChatMessages: FC<ChatMessagesProps> = ({
    name,
    member,
    chatId,
    apiUrl,
    paramValue,
    socketUrl,
    socketQuery,
    paramKey,
    type,
}: ChatMessagesProps): JSX.Element => {
    // Chat query information.
    const { data, status, hasNextPage, isFetchingNextPage, fetchNextPage } =
        useChatQuery({
            queryKey: `chat:${chatId}`,
            apiUrl,
            paramKey,
            paramValue,
        });

    /**
     * Url page params.
     */
    const params = useParams();

    // If status is pending, return a load component.
    if (status === 'pending') {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 className="w-7 h-7 text-zinc-500 animate-spin my-4" />
                <p className="text-xs dark:text-zinc-400">
                    {' '}
                    Loading messages...{' '}
                </p>
            </div>
        );
    }

    // If an a error, return a error component.
    if (status === 'error') {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <ServerCrash className="w-7 h-7 text-zinc-500 animate-spin my-4" />
                <p className="text-xs dark:text-zinc-400">
                    {' '}
                    Something went wrong!{' '}
                </p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col py-4 overflow-y-auto">
            <div className="flex-1" />
            <ChatWelcome type={type} name={name} />
        </div>
    );
};
