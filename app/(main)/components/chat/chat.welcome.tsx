import { Hash } from 'lucide-react';
import type { FC, JSX } from 'react';

import { ChatType } from '../../models';

/**
 * Model for chat welcome component props.
 */
interface ChatWelcomeProps {
    name: string;
    type: ChatType;
}

/**
 * Chat welcome component.
 *
 * @param { ChatWelcomeProps } param0 - Chat welcome props.
 *
 * @returns { JSX.Element } Chat welcome component.
 */
export const ChatWelcome: FC<ChatWelcomeProps> = ({
    type,
    name,
}: ChatWelcomeProps): JSX.Element => {
    return (
        <div className="space-y-2 px-4 mb-4">
            {type === ChatType.channel && (
                <div
                    className="
                        w-[75px] h-[75px] bg-zinc-500 justify-center
                        dark:bg-zinc-700 items-center flex rounded-full
                    "
                >
                    <Hash className="w-12 h-12 text-white" />
                </div>
            )}
            <p className="text-xl md:text-3xl font-bold">
                {type === ChatType.channel ? 'Welcome to #' : ''}
                {name}
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                {type === ChatType.channel
                    ? `This is the start of the #${name} channel.`
                    : `This is the start of your conversation with ${name}`}
            </p>
        </div>
    );
};
