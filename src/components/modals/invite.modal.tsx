'use client';

import type { FC, JSX } from 'react';

import {
    Dialog,
    DialogContent,
    ModalHeader,
    InviteButtons,
    Label,
} from '@/components';
import { useHandleModal } from '@/hooks';
import { ModalTypeKeys } from '@/models';

/**
 * Invite server modal.
 *
 * @returns { JSX.Element | null } Invite server modal.
 */
export const InviteModal: FC = (): JSX.Element | null => {
    const { isModalOpen, handleClose } = useHandleModal({
        modalType: ModalTypeKeys.INVITE,
    });

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <ModalHeader title="Invite Friends" />
                <div className="p-6">
                    <Label
                        className="
                            uppercase text-sm font-bold text-zinc-500
                            dark:text-secondary/70
                        "
                    >
                        {' '}
                        Server invite link{' '}
                    </Label>
                    <InviteButtons />
                </div>
            </DialogContent>
        </Dialog>
    );
};
