'use client';

import type { FC, JSX } from 'react';

import { Dialog, ChannelModalHeader } from '@/components';
import { useHandleModal } from '@/hooks';
import { ModalTypeKeys } from '@/models';

/**
 * Edit server form modal.
 *
 * @returns { JSX.Element | null } Create server form modal.
 */
export const EditChannelModal: FC = (): JSX.Element => {
    /**
     * Channel modal type.
     */
    const modalType = ModalTypeKeys.EDIT_CHANNEL;

    const { isModalOpen, handleClose } = useHandleModal({
        modalType,
    });

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <ChannelModalHeader modalType={modalType} />
        </Dialog>
    );
};
