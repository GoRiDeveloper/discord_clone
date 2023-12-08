import { useCallback, useMemo, useState } from 'react';

/**
 * Hook to handle a generic state.
 */
export const useToggle = () => {
    // Generic boolean state.
    const [status, setStatus] = useState<Boolean>(false);

    /**
     * Function to handle generic state.
     */
    const toggleStatus = useCallback(() => {
        // Change the current state, so that it is the opposite of the current state.
        setStatus((currentStatus) => !currentStatus);
    }, []);

    /**
     * Values a generic toggle.
     */
    const values = useMemo(
        () => ({
            status,
            toggleStatus,
        }),
        [status, toggleStatus]
    );

    return values;
};
