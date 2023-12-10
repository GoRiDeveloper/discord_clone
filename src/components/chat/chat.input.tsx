'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Plus, Smile } from 'lucide-react';
import qs from 'query-string';
import type { FC, JSX } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { Form, FormControl, FormField, FormItem, Input } from '@/components';
import { useModal } from '@/hooks';

/**
 * Model of the properties of the Chat Input component.
 */
interface ChatInputProps {
    apiUrl: string;
    query: Record<string, any>;
    name: string;
    type: 'conversation' | 'channel';
}

/**
 * Chat form schema.
 */
const formSchema = z.object({
    content: z.string().min(1),
});

/**
 * Model for chat form.
 */
type ChatForm = z.infer<typeof formSchema>;

/**
 * Chat input component.
 *
 * @param { ChatInputProps } param0 - Chat input props.
 *
 * @returns { JSX.Element } Chat input component.
 */
export const ChatInput: FC<ChatInputProps> = ({
    apiUrl,
    query,
    name,
    type,
}: ChatInputProps): JSX.Element => {
    // Modal store functionalities.
    const { onOpen } = useModal();

    /**
     * Chat form.
     */
    const form = useForm<ChatForm>({
        defaultValues: {
            content: '',
        },
        resolver: zodResolver(formSchema),
    });

    /**
     * Form submission status.
     */
    const isLoading = form.formState.isSubmitting;

    /**
     * Message field placeholder.
     */
    const messagePlaceholder = type === 'conversation' ? name : `#${name}`;

    /**
     * Chat sending handler.
     *
     * @param { ChatForm } values - Chat form values.
     */
    const onSubmit = async (values: ChatForm) => {
        try {
            /**
             * Url to send a message.
             */
            const url = qs.stringifyUrl({
                url: apiUrl,
                query,
            });

            // Message sending request.
            await axios.post(url, values);
        } catch (error) {
            console.error({ error });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="relative p-4 pb-6">
                                    <button
                                        className="
                                            absolute top-7 left-8 w-[24px] h-[24px] bg-zinc-500 flex
                                            dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300
                                            transition rounded-full p-1 items-center justify-center
                                        "
                                        type="button"
                                        onClick={() =>
                                            onOpen('messageFile', {
                                                apiUrl,
                                                query,
                                            })
                                        }
                                    >
                                        <Plus className="text-white dark:text-[#313338]" />
                                    </button>
                                    <Input
                                        className="
                                            py-6 bg-zinc-200/90 border-none border-0
                                            dark:bg-zinc-700/75 focus-visible:ring-0
                                            focus-visible:ring-offset-0 text-zinc-600
                                            dark:text-zinc-200 px-14
                                        "
                                        placeholder={`Message ${messagePlaceholder}`}
                                        disabled={isLoading}
                                        {...field}
                                    />
                                    <div className="absolute top-7 right-8">
                                        <Smile />
                                    </div>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};
