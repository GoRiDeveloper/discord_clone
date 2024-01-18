import { useModal } from '@/hooks';
import { ModalType, type ModalTypeProps } from '@/models';

/**
 * Hook to handle the activation of modals in the application.
 *
 * @param { UseModalInfoProps } param0 - Handle modal props.
 */
export const useHandleModal = ({ modalType }: ModalTypeProps) => {
    // Modal store functionalities.
    const { data, isOpen, type, onClose } = useModal();

    /**
     * Check if the specific modal is open.
     */
    const isModalOpen = isOpen && type === ModalType[modalType];

    /**
     * Functionality to close the modal.
     */
    const handleClose = (): void => {
        onClose();
    };

    return { data, isModalOpen, handleClose };
};
