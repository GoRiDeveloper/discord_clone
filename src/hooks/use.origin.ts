'use client';

import { useMounted } from '@/hooks';

/**
 * Custom hook where the origin of the url is returned.
 *
 * @returns { string } Url string if client side, otherwise empty string.
 */
export const useOrigin = (): string => {
    useMounted({ valueToReturn: '' });

    /**
     * String url.
     */
    const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '';

    return origin;
};
