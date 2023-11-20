import { Server } from '@prisma/client';
import { create } from 'zustand';

/**
 * Modal types.
 */
export type ModalType =
    | 'createServer'
    | 'createChannel'
    | 'invite'
    | 'editServer'
    | 'members';

/**
 * Modal information.
 */
interface ModalData {
    server?: Server;
}

/**
 * Model for modal store.
 */
interface ModalStore {
    type: ModalType | null;
    isOpen: boolean;
    data: ModalData;
    // eslint-disable-next-line no-unused-vars
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

/**
 * Hook for modal store.
 */
export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false }),
}));
