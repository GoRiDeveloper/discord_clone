'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import qs from 'query-string';

import { useSocketContext } from './';
import type { ParamKeyModel } from '../models';

/**
 * Model port chat query hook.
 */
interface ChatQueryProps {
    queryKey: string;
    apiUrl: string;
    paramValue: string;
    paramKey: ParamKeyModel;
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
        refetchInterval: isConnected ? false : 1000,
        queryFn: ({ pageParam }) => fetchMessages({ pageParam }),
        getNextPageParam: (lastPage: any) => lastPage?.nextCursor,
    });

    return { ...queryData };
};
