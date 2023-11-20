'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, type FC, type JSX } from 'react';

import {
    Button,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components';
import { useModal } from '@/hooks';

/**
 * Invite server modal.
 *
 * @returns { JSX.Element | null } Invite server modal.
 */
export const LeaveServerModal: FC = (): JSX.Element | null => {
    // Loader state.
    const [isLoading, setIsLoading] = useState(false);

    // Modal store functionalities.
    const { isOpen, type, data, onClose } = useModal();

    /**
     * App router.
     */
    const router = useRouter();

    /**
     * Server information.
     */
    const { server } = data;

    /**
     * Check if the invitation modal is open.
     */
    const isModalOpen = isOpen && type === 'leaveServer';

    /**
     * Function to exit the server.
     */
    const onExit = async (): Promise<void> => {
        try {
            // Change the state of the loader while the user leaves the server.
            setIsLoading(true);

            // Request for the logged in user to exit the server.
            await axios.patch(`/api/servers/${server?.id}/leave`);

            // Close modal function.
            onClose();

            // Refresh the router.
            router.refresh();

            // Return to the main route of the application.
            router.push('/');
        } catch (error) {
            console.error(error);
        } finally {
            // Change the state of the loader when the request to leave the server ends.
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        {' '}
                        Leave Server{' '}
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-center text-zinc-500">
                    Are you sure you want to leave
                    <span className="font-semibold text-indigo-500">
                        {server?.name}
                    </span>
                    ?
                </DialogDescription>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button
                            variant="ghost"
                            disabled={isLoading}
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            disabled={isLoading}
                            onClick={onExit}
                        >
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
