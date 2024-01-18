'use client';

import qs from 'query-string';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Axios } from '@/lib';
import { ChatType, ChatForm, ChatDefaultValues } from '../models';
import { chatItemSchema } from '../schemas';

/**
 * Model for chat input props.
 */
interface UseChatInputProps {
    type: ChatType;
    name: string;
    apiUrl: string;
    query: Record<string, any>;
}

/**
 * Hook to manage the information the field for the chat.
 *
 * @param { UseChatInputProps } param0 - Chat input props.
 */
export const useChatInput = ({
    type,
    name,
    apiUrl,
    query,
}: UseChatInputProps) => {
    /**
     * App router.
     */
    const router = useRouter();

    /**
     * Chat form.
     */
    const form = useForm<ChatForm>({
        defaultValues: ChatDefaultValues,
        resolver: zodResolver(chatItemSchema),
    });

    /**
     * Form submission status.
     */
    const isLoading = form.formState.isSubmitting;

    /**
     * Message field placeholder.
     */
    const messagePlaceholder =
        type === ChatType.conversation ? name : `#${name}`;

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
            await Axios.post(url, values);

            // Reset the form.
            form.reset();

            // Refresh the router.
            router.refresh();
        } catch (error) {
            console.error({ error });
        }
    };

    return { form, isLoading, messagePlaceholder, onSubmit };
};
