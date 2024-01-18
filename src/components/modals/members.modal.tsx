'use client';

import type { FC, JSX } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    ScrollArea,
    Member,
} from '@/components';
import { useHandleModal } from '@/hooks';
import { ModalTypeKeys } from '@/models';
import type { ServerWithMembersWithProfiles } from '@/types';

/**
 * Members modal.
 *
 * @returns { JSX.Element | null } Members modal.
 */
export const MembersModal: FC = (): JSX.Element | null => {
    const { data, isModalOpen, handleClose } = useHandleModal({
        modalType: ModalTypeKeys.MEMBERS,
    });

    // Server information.
    const { server } = data as { server: ServerWithMembersWithProfiles };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        {' '}
                        Manage Members{' '}
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        {server?.members?.length} Members
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="mt-8 max-h-[420px] pr-6">
                    {server?.members?.map((member) => (
                        <Member key={member.id} member={member} />
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
