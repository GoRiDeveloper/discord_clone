'use client';

import axios from 'axios';
import qs from 'query-string';
import { useState, type FC, type JSX } from 'react';

import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components';
import { useModal } from '@/hooks';

/**
 * Delete message modal.
 *
 * @returns { JSX.Element | null } Delete message modal.
 */
export const DeleteMessageModal: FC = (): JSX.Element | null => {
    // Loader state.
    const [isLoading, setIsLoading] = useState(false);

    // Modal store functionalities.
    const { isOpen, type, data, onClose } = useModal();

    /**
     * Server information.
     */
    const { apiUrl, query } = data;

    /**
     * Check if the delete channel modal is open.
     */
    const isModalOpen = isOpen && type === 'deleteMessage';

    /**
     * Function to delete message on the server.
     */
    const onDelete = async (): Promise<void> => {
        try {
            // Change the state of the loader while delete channel on the server.
            setIsLoading(true);

            /**
             * Url to delete a channel on the server.
             */
            const url = qs.stringifyUrl({
                url: apiUrl || '',
                query,
            });

            // Request to delete message on the channel.
            await axios.delete(url);

            // Close modal function.
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            // Change the state of the loader when the request to delete the server ends.
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        {' '}
                        Delete Message{' '}
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-center text-zinc-500">
                    Are you sure you want do this?
                    <br />
                    The message will be permanently deletes.
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
                            onClick={onDelete}
                        >
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
