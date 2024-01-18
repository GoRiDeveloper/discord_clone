'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { useForm } from 'react-hook-form';

import { Axios } from '@/lib';
import { useModal } from '@/hooks';
import {
    DefaultMessageFile,
    MessageFileType,
    ModalType,
    ModalTypeKeys,
} from '@/models';
import { messageFileSchema } from '@/schemas';

/**
 * Hook to handle file functionalities in messages.
 */
export const useMessageFile = () => {
    // Modal functionalities.
    const { data, isOpen, type, onClose } = useModal();

    /**
     * App router.
     */
    const router = useRouter();

    /**
     * Server form.
     */
    const form = useForm<MessageFileType>({
        resolver: zodResolver(messageFileSchema),
        defaultValues: DefaultMessageFile,
    });

    // Destructure the query and the api url of the modal information.
    const { apiUrl, query } = data;

    /**
     * Form status being submitted.
     */
    const isLoading = form.formState.isSubmitting;

    /**
     * Check if the create server modal is open.
     */
    const isModalOpen =
        isOpen && type === ModalType[ModalTypeKeys.MESSAGE_FILE];

    // If the modal is not open and form is dirty, reset the form.
    if (!isModalOpen && form.formState.isDirty) form.reset();

    /**
     * Function to submit a message file form.
     *
     * @param { MessageFileType } values - Message file form values.
     *
     * @returns { Promise<void> } Functionality to submit message file form.
     */
    const onSubmit = async (values: MessageFileType): Promise<void> => {
        try {
            /**
             * Url to send a message file.
             */
            const url = qs.stringifyUrl({
                url: apiUrl || '',
                query,
            });

            // Function to send a message.
            await Axios.post(url, {
                ...values,
                content: values.fileUrl,
            });

            // Reset the form.
            form.reset();

            // Refresh the router.
            router.refresh();

            // Close modal.
            onClose();
        } catch (error) {
            console.error({ error });
        }
    };

    return { form, isLoading, onSubmit };
};
