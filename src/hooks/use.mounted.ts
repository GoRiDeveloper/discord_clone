'use client';

import { useState, useEffect } from 'react';

/**
 * Model for use mounted hook props.
 */
interface UseMountedProps {
    valueToReturn: null | string;
}

/**
 * Hook to check if component is mounted.
 *
 * @param { UseMountedProps } param0 - Mounted hook props.
 *
 * @returns { null | string | void } - Return value.
 */
export const useMounted = ({
    valueToReturn,
}: UseMountedProps): null | string | void => {
    // Status to check if the component is mounted.
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        // Change the state of the component when it is mounted.
        setIsMounted(true);
    }, []);

    // If the component is not mounted, return value to return.
    if (!isMounted) return valueToReturn;
};
