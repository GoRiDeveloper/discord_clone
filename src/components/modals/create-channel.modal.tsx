'use client';

import type { FC, JSX } from 'react';

import { Dialog, ChannelModalHeader } from '@/components';
import { useHandleModal } from '@/hooks';
import { ModalTypeKeys } from '@/models';

/**
 * Create server form modal.
 *
 * @returns { JSX.Element | null } Create server form modal.
 */
export const CreateChannelModal: FC = (): JSX.Element | null => {
    /**
     * Channel modal type.
     */
    const modalType = ModalTypeKeys.CREATE_CHANNEL;

    const { isModalOpen, handleClose } = useHandleModal({
        modalType,
    });

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <ChannelModalHeader modalType={modalType} />
        </Dialog>
    );
};
