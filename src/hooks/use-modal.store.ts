import { create } from 'zustand';

export type ModalType = 'createServer';

/**
 * Model for modal store.
 */
interface ModalStore {
    type: ModalType | null;
    isOpen: boolean;
    // eslint-disable-next-line no-unused-vars
    onOpen: (type: ModalType) => void;
    onClose: () => void;
}

/**
 * Hook for modal store.
 */
export const useModal = create<ModalStore>((set) => ({
    type: null,
    isOpen: false,
    onOpen: (type) => set({ isOpen: true, type }),
    onClose: () => set({ type: null, isOpen: false }),
}));
