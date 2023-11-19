import { useState, useEffect } from 'react';

/**
 * Custom hook where the origin of the url is returned.
 *
 * @returns { string } Url string if client side, otherwise empty string.
 */
export const useOrigin = (): string => {
    // State for component.
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Change state for component.
        setMounted(true);
    }, []);

    /**
     * String url.
     */
    const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '';

    // Return empty string when no component is mounted.
    if (!mounted) return '';

    return origin;
};
