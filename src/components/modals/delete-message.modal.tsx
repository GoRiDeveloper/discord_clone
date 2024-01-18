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
 * Delete message modal.
 *
 * @returns { JSX.Element | null } Delete message modal.
 */
export const DeleteMessageModal: FC = (): JSX.Element | null => {
    /**
     * Modal type.
     */
    const modalType = ModalTypeKeys.DELETE_MESSAGE;

    const { isModalOpen, handleClose } = useHandleModal({
        modalType,
    });

    const { isLoading, onDelete } = useDelete({
        modalType,
    });

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DeleteTitle modalType={modalType} />
                <DeleteDescription modalType={modalType} />
                <DeleteButtons
                    isLoading={isLoading}
                    handleClose={handleClose}
                    onDelete={onDelete}
                />
            </DialogContent>
        </Dialog>
    );
};
