import qs from 'query-string';
import { useInfiniteQuery } from '@tanstack/react-query';

import { useSocketContext } from '@/hooks';

/**
 * Model port chat query hook.
 */
interface ChatQueryProps {
    queryKey: string;
    apiUrl: string;
    paramValue: string;
    paramKey: 'channelId' | 'conversationId';
}

/**
 * Hook for chat query.
 *
 * @param { ChatQueryProps } param0 - Chat query props.
 */
export const useChatQuery = ({
    queryKey,
    apiUrl,
    paramKey,
    paramValue,
}: ChatQueryProps) => {
    // Socket context functionalities.
    const { isConnected } = useSocketContext();

    /**
     * Model for fetch messages handler props
     */
    interface FetchMessagesProps {
        pageParam: any;
    }

    /**
     * Request handler for messages obtained in the database.
     *
     * @param { FetchMessagesProps } param0 - Fetch messages props.
     *
     * @returns { Promise<any> } Messages response.
     */
    const fetchMessages = async ({
        pageParam = undefined,
    }: FetchMessagesProps): Promise<any> => {
        /**
         * Url to get messages.
         */
        const url = qs.stringifyUrl(
            {
                url: apiUrl,
                query: {
                    cursor: pageParam,
                    [paramKey]: paramValue,
                },
            },
            { skipNull: true }
        );

        /**
         * Messages response.
         */
        const res = await fetch(url);

        // Messages response converted to JSON.
        return res.json();
    };

    /**
     * Infinite query request information.
     */
    const queryData = useInfiniteQuery({
        queryKey: [queryKey],
        initialPageParam: undefined,
        refetchInterval: isConnected ? false : 1000,
        queryFn: fetchMessages,
        getNextPageParam: (lastPage: any) => lastPage?.nextCursor,
    });

    return { ...queryData };
};
