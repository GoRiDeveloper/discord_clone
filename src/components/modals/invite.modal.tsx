'use client';

import type { FC, JSX } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    Label,
    Input,
    Button,
} from '@/components';
import { useModal } from '@/hooks';

/**
 * Create server form modal.
 *
 * @returns { JSX.Element | null } Create server form modal.
 */
export const InviteModal: FC = (): JSX.Element | null => {
    // Modal store functionalities.
    const { isOpen, onClose, type } = useModal();

    /**
     * Check if the invitation modal is open.
     */
    const isModalOpen = isOpen && type === 'invite';

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        {' '}
                        Invite Friends{' '}
                    </DialogTitle>
                </DialogHeader>
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
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input
                            className="
                                bg-zinc-300/50 focus-visible:ring-0
                                text-black focus-visible:ring-offset-0
                                border-0
                            "
                            value="invite-link"
                        />
                        <Button size="icon">
                            <Copy className="w-4 h-4" />
                        </Button>
                    </div>
                    <Button
                        variant="link"
                        size="sm"
                        className="text-xs text-zinc-500 mt-4"
                    >
                        Generate a new link
                        <RefreshCw className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
