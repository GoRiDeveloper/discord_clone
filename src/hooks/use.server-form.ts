'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm, type UseFormReturn } from 'react-hook-form';

import { Axios } from '@/lib';
import { useModal } from '@/hooks';
import {
    ApiRoutes,
    ModalTypeKeys,
    ServerDefaultValues,
    type ServerFormProps,
    type ServerType,
} from '@/models';
import { serverSchema } from '@/schemas';

/**
 * Server form hook.
 *
 * @param { ServerFormProps } param0 - Server form modal hook props.
 */
export const useServerForm = ({
    isInitialModal,
    modalType,
}: ServerFormProps) => {
    /**
     * App router.
     */
    const router = useRouter();

    /**
     * Server form.
     */
    const form: UseFormReturn<ServerType> = useForm<ServerType>({
        resolver: zodResolver(serverSchema),
        defaultValues: ServerDefaultValues,
    });

    // Modal store functionalities.
    const { data, onClose } = useModal();

    /**
     * Form status being submitted.
     */
    const isLoading = form.formState.isLoading;

    /**
     * Server information.
     */
    const { server } = data;

    useEffect(() => {
        // If there is data from the server and the form is empty, fill in that data from the server.
        if (server && !form.formState.isDirty && !isInitialModal) {
            const values: ServerType = form.getValues();

            Object.keys(values).forEach((key): void => {
                const serverKey = key as keyof ServerType;
                form.setValue(serverKey, server[serverKey]);
            });
        }
    }, [form, server, isInitialModal]);

    /**
     * Function to submit server form.
     *
     * @param { FormType } values - Server form values.
     *
     * @returns { Promise<void> } Functionality to submit server form.
     */
    const onSubmitForm = async (values: ServerType): Promise<void> => {
        try {
            // If the modal is to create a server, build the request to create
            // the server, if it is to edit it, build the request to edit the server.
            if (modalType === ModalTypeKeys.CREATE_SERVER) {
                await Axios.post(ApiRoutes.servers, values);
            } else {
                await Axios.patch(ApiRoutes.server(server?.id), values);
            }

            // Reset the form.
            form.reset();

            // Refresh the router.
            router.refresh();

            // If is edit server modal, close modal.
            if (modalType === ModalTypeKeys.EDIT_SERVER) {
                onClose();
            }
        } catch (error) {
            console.error({ error });
        }
    };

    return { form, isLoading, onSubmitForm };
};
