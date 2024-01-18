'use client';

import type { FC, JSX } from 'react';

import {
    Dialog,
    DialogContent,
    DeleteButtons,
    DeleteDescription,
    DeleteTitle,
} from '@/components';
import { useDelete, useHandleModal } from '@/hooks';
import { ModalTypeKeys } from '@/models';

/**
 * Delete server modal.
 *
 * @returns { JSX.Element | null } Delete server modal.
 */
export const DeleteServerModal: FC = (): JSX.Element | null => {
    /**
     * Modal type.
     */
    const modalType = ModalTypeKeys.DELETE_SERVER;

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
                    title={data.serverName}
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
