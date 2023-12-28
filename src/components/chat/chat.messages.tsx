'use client';

import { useRef, type ElementRef, type FC, type JSX } from 'react';
import { format } from 'date-fns';
import { Member } from '@prisma/client';
import { useParams } from 'next/navigation';
import { Loader2, ServerCrash } from 'lucide-react';

import { ChatWelcome } from '@/components/chat/chat.welcome';
import { ChatItem } from '@/components/chat/chat.item';
import { useChatQuery, useChatSocket, useChatScroll } from '@/hooks';
import type { MessageWithMemberWithProfile } from '@/models';

/**
 * Date format.
 */
const DATE_FORMAT = 'd MMM yyyy, HH:mm';

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
     * Chat section reference.
     */
    const chatRef = useRef<ElementRef<'div'>>(null);

    /**
     * Reference section below.
     */
    const bottomRef = useRef<ElementRef<'div'>>(null);

    // Hook to manage the chat socket.
    useChatSocket({
        addKey: `chat:${chatId}`,
        updateKey: `chat:${chatId}:messages`,
        queryKey: `chat:${chatId}:messages:update`,
    });

    // Hook to manage the scroll chat.
    useChatScroll({
        chatRef,
        bottomRef,
        shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
        count: data?.pages?.[0]?.items?.length ?? 0,
        loadMore: fetchNextPage,
    });

    /**
     * Url page params.
     */
    //const params = useParams();

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
        <div
            className="flex-1 flex flex-col py-4 overflow-y-auto"
            ref={chatRef}
        >
            {!hasNextPage && <div className="flex-1" />}
            {!hasNextPage && <ChatWelcome type={type} name={name} />}
            {hasNextPage && (
                <div className="flex justify-center">
                    {isFetchingNextPage ? (
                        <Loader2 className="w-6 h-6 text-zinc-500 animate-spin my-4" />
                    ) : (
                        <button
                            className="
                                dark:hover:text-zinc-300 dark:text-zinc-400 transition
                                hover:text-zinc-600 text-zinc-500 text-xs my-4
                            "
                            onClick={() => fetchNextPage()}
                        >
                            Load previous messages
                        </button>
                    )}
                </div>
            )}
            <div className="flex flex-col-reverse mt-auto">
                {data?.pages?.map((group, i) => (
                    <div key={i}>
                        {group.items.map(
                            (message: MessageWithMemberWithProfile) => (
                                <ChatItem
                                    key={message.id}
                                    id={message.id}
                                    member={message.member}
                                    content={message.content}
                                    fileUrl={message.fileUrl}
                                    deleted={message.deleted}
                                    currentMember={member}
                                    socketUrl={socketUrl}
                                    socketQuery={socketQuery}
                                    isUpdated={
                                        message.updatedAt !== message.createdAt
                                    }
                                    timestamp={format(
                                        new Date(message.createdAt),
                                        DATE_FORMAT
                                    )}
                                />
                            )
                        )}
                    </div>
                ))}
            </div>
            <div ref={bottomRef} />
        </div>
    );
};
