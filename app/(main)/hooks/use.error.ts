'use client';

import { useRouter } from 'next/navigation';

/**
 * Hook to handle errors functionalities.
 */
export const useError = () => {
    /**
     * Router app.
     */
    const router = useRouter();

    /**
     * Function to reload page.
     */
    const handleReload = () => {
        router.refresh();
    };

    return { handleReload };
};
