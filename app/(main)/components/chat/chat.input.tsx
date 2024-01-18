'use client';

import type { FC, JSX } from 'react';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useChatInput } from '../../hooks';
import type { ChatType } from '../../models';
import { MessageInput } from './message.input';

/**
 * Model of the properties of the Chat Input component.
 */
interface ChatInputProps {
    apiUrl: string;
    query: Record<string, any>;
    name: string;
    type: ChatType;
}

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
    const { form, isLoading, messagePlaceholder, onSubmit } = useChatInput({
        type,
        name,
        apiUrl,
        query,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <MessageInput
                                    field={field}
                                    apiUrl={apiUrl}
                                    query={query}
                                    messagePlaceholder={messagePlaceholder}
                                    isLoading={isLoading}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};
