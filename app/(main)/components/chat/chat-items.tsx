import { Member } from '@prisma/client';
import { format } from 'date-fns';
import type { FC, JSX } from 'react';

import type { MessageWithMemberWithProfile } from '../../models';
import { ChatItem } from './chat_item/chat.item';

/**
 * Date format.
 */
const DATE_FORMAT = 'd MMM yyyy, HH:mm';

/**
 * Model for chat items props.
 */
interface ChatItemsProps {
    group?: { items: MessageWithMemberWithProfile[] };
    socketUrl: string;
    member: Member;
    socketQuery: Record<string, string>;
}

/**
 * Chat Items component.
 *
 * @param { ChatItemsProps } param0 - Chat items props.
 *
 * @returns { JSX.Element } Chat Items component.
 */
export const ChatItems: FC<ChatItemsProps> = ({
    member,
    socketUrl,
    group,
    socketQuery,
}: ChatItemsProps): JSX.Element => {
    return (
        <>
            {group?.items.map((message) => (
                <ChatItem
                    key={message.id}
                    id={message.id}
                    member={message.member}
                    content={message.content}
                    fileUrl={message.fileUrl}
                    deleted={message.deleted}
                    currentMember={member}
                    socketUrl={socketUrl}
                    socketQuery={socketQuery}
                    isUpdated={message.updatedAt !== message.createdAt}
                    timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                />
            ))}
        </>
    );
};
