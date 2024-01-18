'use client';

import type { FC, JSX } from 'react';

import { useChatItem } from '../../../hooks';
import { ChatItemProps } from '../../../models';
import {
    ChatItemOptionsButtons,
    ChatItemAvatar,
    ChatItemEdited,
    ChatItemForm,
    ChatItemIsImage,
    ChatItemIsPDF,
    ChatItemUserInfo,
} from './';

/**
 * Chat item component.
 *
 * @param { ChatItemProps } param0 - Chat item component props.
 *
 * @returns { JSX.Element } Chat item component.
 */
export const ChatItem: FC<ChatItemProps> = ({
    id,
    content,
    timestamp,
    socketUrl,
    deleted,
    isUpdated,
    fileUrl,
    currentMember,
    member,
    socketQuery,
}: ChatItemProps): JSX.Element => {
    const {
        form,
        canDeleteMessage,
        canEditMessage,
        isPDF,
        isEditing,
        isImage,
        isLoading,
        setIsEditing,
        onMemberClick,
        onSubmit,
    } = useChatItem({
        id,
        content,
        fileUrl,
        currentMember,
        member,
        deleted,
        socketUrl,
        socketQuery,
    });

    return (
        <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
            <div className="group flex gap-x-2 items-start w-full">
                <ChatItemAvatar
                    profileImgUrl={member.profile.imageUrl}
                    onMemberClick={onMemberClick}
                />
                <div className="flex flex-col w-full">
                    <ChatItemUserInfo
                        timestamp={timestamp}
                        profileName={member.profile.name}
                        profileRole={member.role}
                        onMemberClick={onMemberClick}
                    />
                    {isImage && (
                        <ChatItemIsImage
                            fileUrl={fileUrl as string}
                            content={content}
                        />
                    )}
                    {isPDF && <ChatItemIsPDF fileUrl={fileUrl as string} />}
                    {!fileUrl && !isEditing && (
                        <ChatItemEdited
                            content={content}
                            deleted={deleted}
                            isLoading={isLoading}
                            isUpdated={isUpdated}
                        />
                    )}
                    {!fileUrl && isEditing && (
                        <ChatItemForm
                            form={form}
                            isLoading={isLoading}
                            onSubmit={onSubmit}
                        />
                    )}
                </div>
            </div>
            {canDeleteMessage && (
                <ChatItemOptionsButtons
                    id={id}
                    socketUrl={socketUrl}
                    socketQuery={socketQuery}
                    canEditMessage={canEditMessage}
                    setIsEditing={setIsEditing}
                />
            )}
        </div>
    );
};
