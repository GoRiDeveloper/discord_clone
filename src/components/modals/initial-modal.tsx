'use client';

import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
} from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState, type FC, type JSX } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

/**
 * Server initial modal form schema reference.
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
 * Initial server form modal.
 *
 * @returns { JSX.Element | null } Initial server form modal.
 */
export const InitialModal: FC = (): JSX.Element | null => {
    // Status to check if the component is mounted.
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Change the state of the component when it is mounted.
        setIsMounted(true);
    }, []);

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
     * Form status being submitted.
     */
    const isLoading = form.formState.isSubmitting;

    /**
     * Function to submit server form.
     *
     * @param { FormType } values - Server form values.
     *
     * @returns {} Functionality to submit server form.
     */
    const onSubmit = async (values: FormType) => {
        console.log(values);
    };

    // If the component is not mounted, return null.
    if (!isMounted) return null;

    return (
        <Dialog open>
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
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                TODO: Image Upload
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
                                Create{' '}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
