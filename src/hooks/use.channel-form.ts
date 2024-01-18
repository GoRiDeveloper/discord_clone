'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChannelType } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
import qs from 'query-string';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Axios } from '@/lib';
import { useModal } from '@/hooks';
import {
    ApiRoutes,
    ChannelDefaultValues,
    ModalType,
    ModalTypeKeys,
    type ChannelFormType,
    type ChannelProps,
} from '@/models';
import { channelSchema } from '@/schemas';

/**
 * Hook to handle the information of the modal to create a channel.
 */
export const useChannelForm = ({ modalType }: ChannelProps) => {
    // Modal store functionalities.
    const { isOpen, type, data, onClose } = useModal();

    /**
     * App router.
     */
    const router = useRouter();

    /**
     * Url page params.
     */
    const params = useParams();

    // Unstructure channel type.
    const { channel, server, channelType } = data;

    /**
     * Server form.
     */
    const form = useForm<ChannelFormType>({
        resolver: zodResolver(channelSchema),
        defaultValues: ChannelDefaultValues(channelType),
    });

    useEffect(() => {
        // Verify the type of channel, if it does not exist,
        // by default it will be a text channel in the form.
        if (!channel) {
            if (channelType) form.setValue('type', channelType);
            else form.setValue('type', ChannelType.TEXT);
        }
    }, [channel, channelType, form]);

    useEffect(() => {
        // Check if there is channel information to set it in the editing form.
        if (channel) {
            const values: ChannelFormType = form.getValues();

            Object.keys(values).forEach((key): void => {
                const channelKey = key as keyof ChannelFormType;
                form.setValue(channelKey, channel[channelKey]);
            });
        }
    }, [form, channel]);

    /**
     * Form status being submitted.
     */
    const isLoading = form.formState.isSubmitting;

    /**
     * Check if the channel modal is open.
     */
    const isModalOpen = isOpen && type === ModalType[modalType];

    /**
     * Verify is create channel modal type.
     */
    const isModalType = modalType === ModalTypeKeys.CREATE_CHANNEL;

    // If the modal is not open and form is dirty, reset the form.
    if (!isModalOpen && form.formState.isDirty) form.reset();

    /**
     * Function to submit channel form.
     *
     * @param { FormType } values - Channel form values.
     *
     * @returns { Promise<void> } Functionality to submit channel form.
     */
    const onSubmit = async (values: ChannelFormType): Promise<void> => {
        try {
            /**
             * Url to create a channer on the server.
             */
            const url = qs.stringifyUrl({
                url: isModalType
                    ? ApiRoutes.channels
                    : ApiRoutes.channel(channel?.id),
                query: {
                    serverId: isModalType ? params?.serverId : server?.id,
                },
            });

            if (isModalType) {
                // Function to create channel in database.
                await Axios.post(url, values);
            } else {
                // Function to edit channel in database.
                await Axios.patch(url, values);
            }

            // Reset the form.
            form.reset();

            // Refresh the router.
            router.refresh();

            // Close Modal function.
            onClose();
        } catch (error) {
            console.error({ error });
        }
    };

    return { form, isLoading, onSubmit };
};
