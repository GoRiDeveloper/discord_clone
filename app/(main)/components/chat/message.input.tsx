import { FC, JSX } from 'react';
import { Loader2 } from 'lucide-react';
import { ControllerRenderProps } from 'react-hook-form';

import type { ChatForm } from '../../models';
import { Input } from '@/components';
import { EmojiPicker, MessageMediaButton } from '../';

/**
 * Model for message input props.
 */
interface MessageInputProps {
    field: ControllerRenderProps<ChatForm, 'content'>;
    apiUrl: string;
    query: Record<string, any>;
    messagePlaceholder: string;
    isLoading: boolean;
}

/**
 * Field component for message.
 *
 * @param { MessageInputProps } param0 - Message input props.
 *
 * @returns { JSX.Element } Field component for message.
 */
export const MessageInput: FC<MessageInputProps> = ({
    field,
    apiUrl,
    query,
    messagePlaceholder,
    isLoading,
}: MessageInputProps): JSX.Element => {
    return (
        <div className="relative p-4 pb-6">
            <MessageMediaButton apiUrl={apiUrl} query={query} />
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
            {isLoading && (
                <Loader2
                    className="
                        absolute right-20 animate-spin
                        text-zinc h-6 w-6 top-7
                    "
                />
            )}
            <div className="absolute top-7 right-8">
                <EmojiPicker
                    onChange={(emoji: string) =>
                        field.onChange(`${field.value} ${emoji}`)
                    }
                />
            </div>
        </div>
    );
};
