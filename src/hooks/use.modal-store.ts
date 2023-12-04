import type { Channel, ChannelType, Server } from '@prisma/client';
import { create } from 'zustand';

/**
 * Modal types.
 */
export type ModalType =
    | 'createChannel'
    | 'deleteChannel'
    | 'createServer'
    | 'deleteServer'
    | 'leaveServer'
    | 'editServer'
    | 'members'
    | 'invite';

/**
 * Modal information.
 */
interface ModalData {
    server?: Server;
    channel?: Channel;
    channelType?: ChannelType;
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
