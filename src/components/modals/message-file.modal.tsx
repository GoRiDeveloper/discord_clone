'use client';

import type { FC, JSX } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    MessageFileForm,
} from '@/components';
import { ModalTypeKeys } from '@/models';
import { useHandleModal } from '@/hooks';

/**
 * Message file form modal.
 *
 * @returns { JSX.Element | null } Initial server form modal.
 */
export const MessageFileModal: FC = (): JSX.Element | null => {
    const { isModalOpen, handleClose } = useHandleModal({
        modalType: ModalTypeKeys.MESSAGE_FILE,
    });

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        {' '}
                        Add an attachment{' '}
                    </DialogTitle>
                    <DialogDescription>
                        {' '}
                        Send a file as a message{' '}
                    </DialogDescription>
                </DialogHeader>
                <MessageFileForm />
            </DialogContent>
        </Dialog>
    );
};
