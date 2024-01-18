'use client';

import { Member } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { Fragment, type FC, type JSX } from 'react';

import { ChatWelcome, ChatItems, ChatPreviousMessages } from './';
import { ServerError } from '../server-error';
import { Loader } from '@/components/loader';
import { useChatMessages } from '../../hooks';
import type { ChatType, ParamKeyModel } from '../../models';

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
    type: ChatType;
    paramKey: ParamKeyModel;
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
    const {
        data,
        chatRef,
        bottomRef,
        status,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useChatMessages({ chatId, apiUrl, paramValue, paramKey });

    // If status is pending, return a load component.
    if (status === 'loading') {
        return <Loader title="Loading messages..." />;
    }

    // If an a error, return a error component.
    if (status === 'error') {
        return <ServerError />;
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
                        <ChatPreviousMessages fetchNextPage={fetchNextPage} />
                    )}
                </div>
            )}
            <div className="flex flex-col-reverse mt-auto">
                {data?.pages?.map((group, i) => (
                    <Fragment key={i}>
                        <ChatItems
                            group={group}
                            member={member}
                            socketUrl={socketUrl}
                            socketQuery={socketQuery}
                        />
                    </Fragment>
                ))}
            </div>
            <div ref={bottomRef} />
        </div>
    );
};
