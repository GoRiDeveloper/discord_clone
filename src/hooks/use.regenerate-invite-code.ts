import { Axios } from '@/lib';
import { useModal, useToggle } from '@/hooks';
import { ModalType, ApiRoutes } from '@/models';

/**
 * Hook for the functionalities to regenerate the invitation code.
 */
export const useRegenerateInviteCode = () => {
    // Loader regenerate state.
    const { status: isLoading, toggleStatus: setIsLoading } = useToggle();

    // Modal store functionalities.
    const { data, onOpen } = useModal();

    /**
     * Server information.
     */
    const { server } = data;

    /**
     * Function to generate a new invitation link.
     */
    const onRegenerate = async () => {
        try {
            // Change loader to true.
            setIsLoading();

            // Response to the request to generate a new invitation link.
            const { data } = await Axios.patch(
                ApiRoutes.inviteCode(server?.id)
            );

            // Functionality to open the invitation modal.
            onOpen(ModalType.INVITE, { server: data });
        } catch (error) {
            // Mostramos el error en consola.
            console.error({ error });
        } finally {
            // Change loader to false.
            setIsLoading();
        }
    };

    return { isLoading, onRegenerate };
};
