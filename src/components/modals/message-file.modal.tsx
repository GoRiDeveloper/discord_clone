'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { type FC, type JSX } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    FileUpload,
    Form,
    FormControl,
    FormField,
    FormItem,
} from '@/components';
import { useModal } from '@/hooks';

/**
 * Message file modal form schema reference.
 */
const formSchema = z.object({
    fileUrl: z.string().min(1, { message: 'Attachment is required.' }),
});

/**
 * Server form type.
 */
type FormType = z.infer<typeof formSchema>;

/**
 * Initial server form modal.
 *
 * @returns { JSX.Element | null } Initial server form modal.
 */
export const MessageFileModal: FC = (): JSX.Element | null => {
    // Modal functionalities.
    const { isOpen, type, data, onClose } = useModal();
    /**
     * App router.
     */
    const router = useRouter();

    /**
     * Server form.
     */
    const form = useForm<FormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileUrl: '',
        },
    });

    // Destructure the query and the api url of the modal information.
    const { apiUrl, query } = data;

    /**
     * Check if the message file modal is open.
     */
    const isModalOpen = isOpen && type === 'messageFile';

    /**
     * Form status being submitted.
     */
    const isLoading = form.formState.isSubmitting;

    /**
     * Close modal handler.
     */
    const onCloseModal = () => {
        form.reset();
        onClose();
    };

    /**
     * Function to submit a message file form.
     *
     * @param { FormType } values - Message file form values.
     *
     * @returns { Promise<void> } Functionality to submit message file form.
     */
    const onSubmit = async (values: FormType): Promise<void> => {
        try {
            /**
             * Url to send a message file.
             */
            const url = qs.stringifyUrl({
                url: apiUrl || '',
                query,
            });

            // Function to send a message.
            await axios.post(url, {
                ...values,
                content: values.fileUrl,
            });

            // Reset the form.
            form.reset();

            // Refresh the router.
            router.refresh();

            // Close modal.
            onCloseModal();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onCloseModal}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        {' '}
                        Add an attachment{' '}
                    </DialogTitle>
                    <DialogDescription>
                        {' '}
                        Send a file as a message{' '}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <div className="space-y-8 sm:px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField
                                    control={form.control}
                                    name="fileUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint="messageFile"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button variant="primary" disabled={isLoading}>
                                {' '}
                                Send{' '}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
