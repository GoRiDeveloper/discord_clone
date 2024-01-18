import { useRouter } from 'next/navigation';

import { Axios } from "@/lib";
import { useToggle, useModal } from '@/hooks';
import { AppRoutes, ApiRoutes } from '@/models';

/**
 * Hook to handle the functionalities to exit the server.
 */
export const useLeaveServer = () => {
    // Loader state.
    const { status: isLoading, toggleStatus: setIsLoading } = useToggle();

    // Modal store functionalities.
    const { data, onClose } = useModal();

    /**
     * App router.
     */
    const router = useRouter();

    /**
     * Server information.
     */
    const { server } = data;

    /**
     * Function to exit the server.
     */
    const onExit = async (): Promise<void> => {
        try {
            // Change the state of the loader while the user leaves the server.
            setIsLoading();

            // Request for the logged in user to exit the server.
            await Axios.patch(ApiRoutes.leaveServer(server?.id));

            // Close modal function.
            onClose();

            // Refresh the router.
            router.refresh();

            // Return to the main route of the application.
            router.push(AppRoutes.HOME);
        } catch (error) {
            console.error({ error });
        } finally {
            // Change the state of the loader when the request to leave the server ends.
            setIsLoading();
        }
    };

    return { serverName: server?.name, isLoading, onExit };
};
