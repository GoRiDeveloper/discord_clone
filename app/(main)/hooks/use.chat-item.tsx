'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { MemberRole } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
import qs from 'query-string';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Axios } from "@/lib";
import { ChatForm, ChatItemProps } from '../models';
import { AppRoutes } from '@/models';
import { chatItemSchema } from '../schemas';

/**
 * Model for use chat item hook props.
 */
type UseChatItemProps = Omit<ChatItemProps, 'timestamp' | 'isUpdated'>;

/**
 * Hook to manage chat item information.
 *
 * @param { UseChatItemProps } param0 - Hook chat item props.
 */
export const useChatItem = ({
    id,
    content,
    fileUrl,
    currentMember,
    member,
    deleted,
    socketQuery,
    socketUrl,
}: UseChatItemProps) => {
    // Editing state.
    const [isEditing, setIsEditing] = useState(false);

    /**
     * App router.
     */
    const router = useRouter();

    /**
     * Url page params.
     */
    const params = useParams();

    /**
     * Chat form.
     */
    const form = useForm<ChatForm>({
        resolver: zodResolver(chatItemSchema),
        defaultValues: {
            content,
        },
    });

    /**
     * Form loading status.
     */
    const isLoading = form.formState.isSubmitting;

    useEffect(() => {
        /**
         * Function to check which key the user presses and activate the editing mode.
         *
         * @param { KeyboardEvent } event - Key pressed event.
         */
        const handleKeyDown = (event: KeyboardEvent) => {
            // If the key pressed is "escape", change the state of the editing.
            if (event.key === 'Escape' || event.keyCode === 27) {
                // Change the state of editing.
                setIsEditing(false);
            }
        };

        // Activate the key pressed event.
        window.addEventListener('keydown', handleKeyDown);

        // Clean the key pressed event, once the component is destroyed.
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        // Form reset based on content change.
        form.reset({
            content,
        });
    }, [form, content]);

    /**
     * File type.
     */
    const fileType = fileUrl?.split('.').pop();

    /**
     * Current member is admin.
     */
    const isAdmin = currentMember.role === MemberRole.ADMIN;

    /**
     * Current member is moderator.
     */
    const isModerator = currentMember.role === MemberRole.MODERATOR;

    /**
     * Current member is owner.
     */
    const isOwner = currentMember.id === member.id;

    /**
     * Can delete message.
     */
    const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);

    /**
     * Can edit message.
     */
    const canEditMessage = !deleted && isOwner && !fileUrl;

    /**
     * The file type is pdf.
     */
    const isPDF = fileType === 'type' && fileType;

    /**
     * File type is image.
     */
    const isImage = !isPDF && fileUrl;

    /**
     * Function to handle the click of a member on the server.
     *
     * @returns { void } Functionality to handle a member click on the server.
     */
    const onMemberClick = (): void => {
        // If the clicked member is the current member, we exit the function.
        if (member.id === currentMember.id) return;
        // Return the application to the chat section of the clicked member.
        router.push(AppRoutes.MEMBER_ID(params?.serverId, member.id));
    };

    /**
     * Function to handle message editing.
     *
     * @param { ChatForm } values - Chat form values.
     */
    const onSubmit = async (values: ChatForm): Promise<void> => {
        try {
            /**
             * Url to edit message.
             */
            const url = qs.stringifyUrl({
                url: `${socketUrl}/${id}`,
                query: socketQuery,
            });

            // Edit message request.
            await Axios.patch(url, values);

            // Reset form.
            form.reset();

            // Change editing state.
            setIsEditing(false);
        } catch (error) {
            console.error({ error });
        }
    };

    return {
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
    };
};
