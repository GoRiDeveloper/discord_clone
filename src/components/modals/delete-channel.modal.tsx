'use client';

import type { FC, JSX } from 'react';

import {
    DeleteButtons,
    DeleteDescription,
    DeleteTitle,
    Dialog,
    DialogContent,
} from '@/components';
import { useDelete, useHandleModal } from '@/hooks';
import { ModalTypeKeys } from '@/models';

/**
 * Delete channel modal.
 *
 * @returns { JSX.Element | null } Delete channel modal.
 */
export const DeleteChannelModal: FC = (): JSX.Element | null => {
    /**
     * Modal type.
     */
    const modalType = ModalTypeKeys.DELETE_CHANNEL;

    const { isModalOpen, handleClose } = useHandleModal({
        modalType,
    });

    const { data, isLoading, onDelete } = useDelete({
        modalType,
    });

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DeleteTitle modalType={modalType} />
                <DeleteDescription
                    title={data.channelName}
                    modalType={modalType}
                />
                <DeleteButtons
                    isLoading={isLoading}
                    handleClose={handleClose}
                    onDelete={onDelete}
                />
            </DialogContent>
        </Dialog>
    );
};
