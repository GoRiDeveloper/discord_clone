import { useParams, useRouter } from 'next/navigation';

import { AppRoutes } from '@/models';

/**
 * Hook for nav item functionalities.
 *
 * @param param0 - Props with id.
 */
export const useChangeButton = ({ id }: { id: string }) => {
    /**
     * App router hook.
     */
    const router = useRouter();

    /**
     * Url params hook.
     */
    const params = useParams();

    /**
     * Handler to redirect to specific server.
     */
    const handleClick = (): void => {
        router.push(AppRoutes.SERVER_ID(id));
    };

    return { router, params, handleClick };
};
