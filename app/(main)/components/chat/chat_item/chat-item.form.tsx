import type { FC, JSX } from 'react';
import { UseFormReturn } from 'react-hook-form';

import {
    Form,
    FormField,
    FormItem,
    FormControl,
    Input,
    Button,
} from '@/components';
import { ChatForm } from '../../../models';

/**
 * Model for chat item component props.
 */
interface ChatItemFormProps {
    form: UseFormReturn<ChatForm, any, undefined>;
    isLoading: boolean;
    onSubmit: (_values: ChatForm) => Promise<void>;
}

/**
 * Chat Item Form Component.
 *
 * @param { ChatItemFormProps } param0 - Chat item form props.
 *
 * @returns { JSX.Element } Chat item form component.
 */
export const ChatItemForm: FC<ChatItemFormProps> = ({
    form,
    isLoading,
    onSubmit,
}: ChatItemFormProps): JSX.Element => {
    return (
        <Form {...form}>
            <form
                className="flex items-center w-full gap-x-2 pt-2"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    name="content"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormControl>
                                <div className="relative w-full">
                                    <Input
                                        className="
                                            p-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none
                                            focus-visible:ring-0 focus-visible:ring-offset-0
                                            dark:text-zinc-200 border-0
                                        "
                                        placeholder="Edited message"
                                        disabled={isLoading}
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button size="sm" variant="primary" disabled={isLoading}>
                    Save
                </Button>
            </form>
            <span className="text-[10px] mt-1 text-zinc-400">
                Press escape to cancel, enter to save
            </span>
        </Form>
    );
};
