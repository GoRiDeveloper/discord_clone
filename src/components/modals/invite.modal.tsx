'use client';

import axios from 'axios';
import { Check, Copy, RefreshCw } from 'lucide-react';
import { useState, type FC, type JSX } from 'react';

import {
    Button,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    Input,
    Label,
} from '@/components';
import { useModal, useOrigin } from '@/hooks';

/**
 * Create server form modal.
 *
 * @returns { JSX.Element | null } Create server form modal.
 */
export const InviteModal: FC = (): JSX.Element | null => {
    // Status for copied url.
    const [copied, setCopied] = useState(false);

    // Loader state.
    const [isLoading, setIsLoading] = useState(false);

    // Modal store functionalities.
    const { isOpen, type, data, onOpen, onClose } = useModal();

    /**
     * Url string origin.
     */
    const origin = useOrigin();

    /**
     * Check if the invitation modal is open.
     */
    const isModalOpen = isOpen && type === 'invite';

    /**
     * Server information.
     */
    const { server } = data;

    /**
     * Server invitation url.
     */
    const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

    /**
     * Function to copy invitation code to server.
     */
    const onCopy = () => {
        // Functionality to copy the invitation link to the system/device.
        navigator.clipboard.writeText(inviteUrl);
        // Change status, from url copy status, to copied
        setCopied(true);

        // Change status, from url copy status, to not copied, after 1 second.
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    /**
     * Function to generate a new invitation link.
     */
    const onRegenerate = async () => {
        try {
            // Change loader to true.
            setIsLoading(true);

            // Response to the request to generate a new invitation link.
            const { data } = await axios.patch(
                `/api/servers/${server?.id}/invite-code`
            );

            // Functionality to open the invitation modal.
            onOpen('invite', { server: data });
        } catch (error) {
            // Mostramos el error en consola.
            console.error({ error });
        } finally {
            // Change loader to false.
            setIsLoading(false);
        }
    };

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
                            disabled={isLoading}
                            value={inviteUrl}
                        />
                        <Button
                            size="icon"
                            disabled={isLoading}
                            onClick={onCopy}
                        >
                            {copied ? <Check /> : <Copy className="w-4 h-4" />}
                        </Button>
                    </div>
                    <Button
                        variant="link"
                        size="sm"
                        className="text-xs text-zinc-500 mt-4"
                        disabled={isLoading}
                        onClick={onRegenerate}
                    >
                        Generate a new link
                        <RefreshCw className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
