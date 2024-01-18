'use client';

import type { FC, JSX } from 'react';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    LeaveServer,
} from '@/components';
import { ModalTypeKeys } from '@/models';
import { useHandleModal } from '@/hooks';

/**
 * Leave server modal.
 *
 * @returns { JSX.Element | null } Leave server modal.
 */
export const LeaveServerModal: FC = (): JSX.Element | null => {
    const { isModalOpen, handleClose } = useHandleModal({
        modalType: ModalTypeKeys.LEAVE_SERVER,
    });

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        {' '}
                        Leave Server{' '}
                    </DialogTitle>
                </DialogHeader>
                <LeaveServer />
            </DialogContent>
        </Dialog>
    );
};
