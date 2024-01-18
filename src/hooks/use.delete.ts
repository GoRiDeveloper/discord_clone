'use client';

import { useRouter } from 'next/navigation';
import qs from 'query-string';

import { Axios } from '@/lib';
import { useModal, useToggle } from '@/hooks';
import {
    ApiRoutes,
    AppRoutes,
    ModalTypeKeys,
    type ModalTypeProps,
} from '@/models';

/**
 * Hook of the functionalities to delete a certain element in the application.
 *
 * @param { UseDeleteProps } param0 - Delete props.
 */
export const useDelete = ({ modalType }: ModalTypeProps) => {
    /**
     * App router.
     */
    const router = useRouter();

    // Loader status.
    const { status: isLoading, toggleStatus: setIsLoading } = useToggle();

    /**
     * Modal store functionalities.
     */
    const { data, onClose } = useModal();

    // Modal information.
    const { server, channel, apiUrl, query } = data;

    /**
     * Function to delete any thing of specify modal.
     */
    const OnDelete = async () => {
        try {
            // Change the state of the loader while the request happens.
            setIsLoading();

            /**
             * Url to delete a thing.
             */
            let url: string;

            if (modalType === ModalTypeKeys.DELETE_CHANNEL) {
                // Url to delete a channel on the server.
                url = qs.stringifyUrl({
                    url: ApiRoutes.channel(channel?.id),
                    query: {
                        serverId: server?.id,
                    },
                });

                // Request to delete channel on the server.
                await Axios.delete(url);

                // Close modal function.
                onClose();

                // Return to the server id route of the application.
                router.push(AppRoutes.SERVER_ID(server?.id as string));

                // Refresh the window.
                window.location.reload();
            }

            if (modalType === ModalTypeKeys.DELETE_MESSAGE) {
                /**
                 * Url to delete a channel on the server.
                 */
                url = qs.stringifyUrl({
                    url: apiUrl || '',
                    query,
                });

                // Request to delete message on the channel.
                await Axios.delete(url);

                // Close modal function.
                onClose();
            }

            if (modalType === ModalTypeKeys.DELETE_SERVER) {
                // Url to delete server.
                url = ApiRoutes.server(server?.id);

                // Request to delete the server.
                await Axios.delete(url);

                // Close modal function.
                onClose();

                // Refresh the router.
                router.refresh();

                // Return to the main route of the application.
                router.push(AppRoutes.HOME);
            }
        } catch (error) {
            console.error({ error });
        } finally {
            // Change the state of the loader when the request ends.
            setIsLoading();
        }
    };

    return {
        data: {
            channelName: channel?.name,
            serverName: server?.name,
        },
        isLoading,
        onDelete: OnDelete,
    };
};
