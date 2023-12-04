'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChannelType } from '@prisma/client';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import qs from 'query-string';
import { useEffect, type FC, type JSX } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import {
    Button,
    Dialog,
    DialogContent,
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components';
import { useModal } from '@/hooks';

/**
 * Create channel modal form schema reference.
 */
const formSchema = z.object({
    name: z
        .string()
        .min(1, { message: 'Channel name is required.' })
        .refine((name) => name !== 'general', {
            message: 'Channel name cannot be "general"',
        }),
    type: z.nativeEnum(ChannelType),
});

/**
 * Server form type.
 */
type FormType = z.infer<typeof formSchema>;

/**
 * Create server form modal.
 *
 * @returns { JSX.Element | null } Create server form modal.
 */
export const CreateChannelModal: FC = (): JSX.Element | null => {
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

    /**
     * Server form.
     */
    const form = useForm<FormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            type: ChannelType.TEXT,
        },
    });

    // Unstructure channel type.
    const { channelType } = data;

    useEffect(() => {
        // Verify the type of channel, if it does not exist,
        // by default it will be a text channel in the form.
        if (channelType) {
            form.setValue('type', channelType);
        } else {
            form.setValue('type', ChannelType.TEXT);
        }
    }, [channelType, form]);

    /**
     * Form status being submitted.
     */
    const isLoading = form.formState.isSubmitting;

    /**
     * Check if the create server modal is open.
     */
    const isModalOpen = isOpen && type === 'createChannel';

    /**
     * Function to submit channel form.
     *
     * @param { FormType } values - Channel form values.
     *
     * @returns { Promise<void> } Functionality to submit channel form.
     */
    const onSubmit = async (values: FormType): Promise<void> => {
        try {
            /**
             * Url to create a channer on the server.
             */
            const url = qs.stringify({
                url: '/api/channels',
                query: {
                    serverId: params?.serverId,
                },
            });

            // Function to create server in database.
            await axios.post(url, values);

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
                        Create channel{' '}
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <div className="space-y-8 sm:px-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            {' '}
                                            Channel name{' '}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Enter channel name"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> Channel Type </FormLabel>
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger
                                                    className="
                                                        focus:ring-offset-0 focus:ring-0
                                                        bg-zinc-300/50 ring-offset-0 capitalize
                                                        outline-none
                                                    "
                                                >
                                                    <SelectValue placeholder="Select a channel type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.values(ChannelType).map(
                                                    (type) => (
                                                        <SelectItem
                                                            key={type}
                                                            value={type}
                                                            className="capitalize"
                                                        >
                                                            {type.toLowerCase()}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
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
