'use client';

import { useRef, type ElementRef } from 'react';

import { socketKeys } from '@/models';
import type { ParamKeyModel } from '../models';
import { useChatQuery, useChatScroll, useChatSocket } from './';

/**
 * Model for use chat message hook props.
 */
interface UseChatMessagesProps {
    chatId: string;
    apiUrl: string;
    paramValue: string;
    paramKey: ParamKeyModel;
}

/**
 * Hook to manage information in chat messages.
 *
 * @param { UseChatMessagesProps } param0 - Chat message hook props.
 */
export const useChatMessages = ({
    chatId,
    apiUrl,
    paramValue,
    paramKey,
}: UseChatMessagesProps) => {
    /**
     * Chat section reference.
     */
    const chatRef = useRef<ElementRef<'div'>>(null);

    /**
     * Reference section below.
     */
    const bottomRef = useRef<ElementRef<'div'>>(null);

    /**
     * Socket query key.
     */
    const queryKey = socketKeys.CHAT_KEY(chatId);

    // Chat query information.
    const { data, status, hasNextPage, isFetchingNextPage, fetchNextPage } =
        useChatQuery({
            queryKey,
            apiUrl,
            paramKey,
            paramValue,
        });

    // Hook to manage the chat socket.
    useChatSocket({
        queryKey,
        addKey: socketKeys.MESSAGE_KEY(chatId),
        updateKey: socketKeys.UPDATE_KEY(chatId),
    });

    // Hook to manage the scroll chat.
    useChatScroll({
        chatRef,
        bottomRef,
        shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
        count: data?.pages?.[0]?.items?.length ?? 0,
        loadMore: fetchNextPage,
    });

    return {
        data,
        chatRef,
        bottomRef,
        status,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    };
};
