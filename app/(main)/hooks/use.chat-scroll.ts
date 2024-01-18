'use client';

import { useEffect, type RefObject } from 'react';

import { useToggle } from '@/hooks';

/**
 * Chat scroll hook props model.
 */
interface ChatScrollProps {
    count: number;
    shouldLoadMore: boolean;
    chatRef: RefObject<HTMLDivElement>;
    bottomRef: RefObject<HTMLDivElement>;
    loadMore: () => void;
}

/**
 * Hook to manage chat scrolling.
 *
 * @param { ChatScrollProps } param0 - Chat scroll hook props.
 */
export const useChatScroll = ({
    count,
    shouldLoadMore,
    chatRef,
    bottomRef,
    loadMore,
}: ChatScrollProps) => {
    // Scroll initialization state functionalities.
    const { status: hasInitialized, toggleStatus: setHasInitialized } =
        useToggle();

    useEffect(() => {
        /**
         * Reference from the top section of the box.
         */
        const topDiv = chatRef?.current;

        /**
         * Function to manage scroll.
         */
        const handleScroll = () => {
            /**
             * Top box.
             */
            const scrollTop = topDiv?.scrollTop;

            // If scroll top is cero and should load more true, should load more.
            if (scrollTop === 0 && shouldLoadMore) loadMore();
        };

        // Add event scroll.
        topDiv?.addEventListener('scroll', handleScroll);

        return () => {
            // Remove event scroll.
            topDiv?.removeEventListener('scroll', handleScroll);
        };
    }, [shouldLoadMore, chatRef, loadMore]);

    useEffect(() => {
        /**
         * Reference from the bottom section of the box.
         */
        const bottomDiv = bottomRef?.current;

        /**
         * Reference from the top section of the box.
         */
        const topDiv = chatRef?.current;

        /**
         * Function to control the auto scroll of the chat.
         *
         * @returns { boolean } Boolean to check if automatic scrolling is done.
         */
        const shouldAutoScroll = (): boolean => {
            // If the scroll has not been initialized and the bottom
            // section exists, change the initialization state.
            if (!hasInitialized && bottomDiv) {
                setHasInitialized();
                return true;
            }

            // If the section above does not exist, return false.
            if (!topDiv) return false;

            /**
             * Calculation of the distance below.
             */
            const distanceFromBottom =
                topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;

            return distanceFromBottom <= 100;
        };

        // If automatic scrolling is done, scroll to the reference
        // of the bottom section of the box.
        if (shouldAutoScroll()) {
            setTimeout(() => {
                bottomRef.current?.scrollIntoView({
                    behavior: 'smooth',
                });
            }, 100);
        }
    }, [hasInitialized, count, bottomRef, chatRef, setHasInitialized]);
};
