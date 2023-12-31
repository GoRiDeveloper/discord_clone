import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useSocketContext } from '@/hooks';
import type { MessageWithMemberWithProfile } from '@/models';

/**
 * Model for the socket hook for chat.
 */
interface ChatSocketProps {
    addKey: string;
    updateKey: string;
    queryKey: string;
}

/**
 * Hook to manage the chat socket.
 *
 * @param { ChatSocketProps } param0 - Chat socket hook props.
 */
export const useChatSocket = ({
    addKey,
    updateKey,
    queryKey,
}: ChatSocketProps) => {
    // Socket for the chat.
    const { socket } = useSocketContext();

    /**
     * client for queries.
     */
    const queryClient = useQueryClient();

    useEffect(() => {
        // In case there is no socket, we exit the function.
        if (!socket) return;

        /**
         * Model for the query handler function.
         */
        type QueryHandler = (
            _oldData: any,
            _message: MessageWithMemberWithProfile
        ) => any;

        /**
         * Socket handler for client queries.
         *
         * @param { MessageWithMemberWithProfile } message - Message with member with profile props.
         * @param { QueryHandler } handler - The query handler function.
         */
        const socketHandler = (
            message: MessageWithMemberWithProfile,
            handler: QueryHandler
        ) => {
            queryClient.setQueryData([queryKey], (oldData: any) =>
                handler(oldData, message)
            );
        };

        /**
         * Function to handle updating messages in chat sockets.
         *
         * @param { any } oldData - Old message information.
         * @param { MessageWithMemberWithProfile } message - Message with member with profile props.
         *
         * @returns { void } Functionality to handle updating messages in chat sockets.
         */
        const updateHandler = (
            oldData: any,
            message: MessageWithMemberWithProfile
        ): void => {
            if (!oldData || !oldData.pages || oldData.pages.length === 0)
                return oldData;

            const handlerPageItems = (item: MessageWithMemberWithProfile) =>
                item.id === message.id ? message : item;

            const newData = oldData.pages.map((page: any) => ({
                ...page,
                items: page.items.map(handlerPageItems),
            }));

            return {
                ...oldData,
                pages: newData,
            };
        };

        /**
         * Function to handle adding messages to chat sockets.
         *
         * @param { any } oldData - Old message information.
         * @param { MessageWithMemberWithProfile } message - Message with member with profile props.
         *
         * @returns { any } Functionality to handle adding messages to chat sockets.
         */
        const addHandler = (
            oldData: any,
            message: MessageWithMemberWithProfile
        ) => {
            if (!oldData || !oldData.pages || oldData.pages.length === 0) {
                return {
                    pages: [
                        {
                            items: [message],
                        },
                    ],
                };
            }

            const newData = [...oldData.pages];

            newData[0] = {
                ...newData[0],
                items: [message, ...newData[0].items],
            };

            return {
                ...oldData,
                pages: newData,
            };
        };

        socket.on(updateKey, (message: MessageWithMemberWithProfile) =>
            socketHandler(message, updateHandler)
        );

        socket.on(addKey, (message: MessageWithMemberWithProfile) =>
            socketHandler(message, addHandler)
        );

        return () => {
            socket.off(addKey);
            socket.off(updateKey);
        };
    }, [queryClient, addKey, queryKey, updateKey, socket]);
};
