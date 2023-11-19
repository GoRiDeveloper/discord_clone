'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, type FC, type JSX } from 'react';
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
    FormLabel,
    FormMessage,
    Input,
} from '@/components';
import { useModal } from '@/hooks';

/**
 * Edit server modal form schema reference.
 */
const formSchema = z.object({
    name: z.string().min(1, { message: 'Server name is required.' }),
    imageUrl: z.string().min(1, { message: 'Server image is required.' }),
});

/**
 * Server form type.
 */
type FormType = z.infer<typeof formSchema>;

/**
 * Edit server form modal.
 *
 * @returns { JSX.Element | null } Edit server form modal.
 */
export const EditServerModal: FC = (): JSX.Element | null => {
    // Modal store functionalities.
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
            name: '',
            imageUrl: '',
        },
    });

    /**
     * Server information.
     */
    const { server } = data;

    useEffect(() => {
        // If the server exists, we complete the form with the server information.
        if (server) {
            form.setValue('name', server.name);
            form.setValue('imageUrl', server.imageUrl);
        }
    }, [server, form]);

    /**
     * Form status being submitted.
     */
    const isLoading = form.formState.isSubmitting;

    /**
     * Check if the edit server modal is open.
     */
    const isModalOpen = isOpen && type === 'editServer';

    /**
     * Function to submit server form.
     *
     * @param { FormType } values - Server form values.
     *
     * @returns { Promise<void> } Functionality to submit server form.
     */
    const onSubmit = async (values: FormType): Promise<void> => {
        try {
            // Function to create server in database.
            await axios.patch(`/api/servers/${server?.id}`, values);

            // Reset the form.
            form.reset();

            // Refresh the router.
            router.refresh();

            // Close Modal function.
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * Functionality to close the modal.
     */
    const handleClose = (): void => {
        form.reset();
        onClose();
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        {' '}
                        Customize your{' '}
                    </DialogTitle>
                    <DialogDescription>
                        {' '}
                        Give your server a personality with a name and an image.
                        You can always change it later{' '}
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
                                    name="imageUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint="serverImage"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            {' '}
                                            Server name{' '}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Enter server name"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button variant="primary" disabled={isLoading}>
                                {' '}
                                Save{' '}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
