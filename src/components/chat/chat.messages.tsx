import type { FC, JSX } from 'react';
import { Member } from '@prisma/client';

import { ChatWelcome } from '@/components';

/**
 * Model for chat messages props.
 */
interface ChatMessagesProps {
    name: string;
    member: Member;
    chatId: string;
    apiUrl: string;
    socketUrl: string;
    paramValue: string;
    socketQuery: Record<string, string>;
    type: 'channel' | 'conversation';
    paramKey: 'channelId' | 'conversationId';
}

/**
 * Chat messages component.
 *
 * @param { ChatMessagesProps } param0 - Chat messages props.
 *
 * @returns { JSX.Element } Chat messages component.
 */
export const ChatMessages: FC<ChatMessagesProps> = ({
    name,
    member,
    chatId,
    apiUrl,
    paramValue,
    socketUrl,
    socketQuery,
    paramKey,
    type,
}: ChatMessagesProps): JSX.Element => {
    return (
        <div className="flex-1 flex flex-col py-4 overflow-y-auto">
            <div className="flex-1" />
            <ChatWelcome type={type} name={name} />
        </div>
    );
};
