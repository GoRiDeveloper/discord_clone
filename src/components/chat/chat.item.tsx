'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Member, MemberRole } from '@prisma/client';
import {
    Edit,
    FileIcon,
    ShieldAlert,
    ShieldCheck,
    Trash,
    X,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState, type FC, type JSX } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import qs from 'query-string';
import z from 'zod';

import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    Input,
    UserAvatar,
} from '@/components';
import { ActionTooltip } from '@/components/action-tooltip';
import type { MemberWithProfile } from '@/components/chat/model';
import { cn } from '@/lib';

/**
 * Model for chat items props.
 */
interface ChatItemProps {
    id: string;
    content: string;
    timestamp: string;
    socketUrl: string;
    deleted: boolean;
    isUpdated: boolean;
    fileUrl: string | null;
    currentMember: Member;
    member: MemberWithProfile;
    socketQuery: Record<string, string>;
}

/**
 * Role icons.
 */
const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: (
        <ShieldCheck className="w-4 h-4 ml-2 text-indigo-500" />
    ),
    [MemberRole.ADMIN]: <ShieldAlert className="w-4 h-4 ml-2 text-rose-500" />,
};

/**
 * Chat content form schema.
 */
const formSchema = z.object({
    content: z.string().min(1),
});

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
    // Editing state.
    const [isEditing, setIsEditing] = useState(false);

    // Delet ing state.
    const [isDeleting, setIsDeleting] = useState(false);

    /**
     * Chat form schema type.
     */
    type ChatType = z.infer<typeof formSchema>;

    /**
     * Chat form.
     */
    const form = useForm<ChatType>({
        resolver: zodResolver(formSchema),
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
     * Function to handle message editing.
     *
     * @param { ChatType } values - Chat form values.
     */
    const onSubmit = async (values: ChatType) => {
        try {
            /**
             * Url to edit message.
             */
            const url = qs.stringifyUrl({
                url: `${socketUrl}/${id}`,
                query: socketQuery,
            });

            // Edit message request.
            await axios.patch(url, values);

            // Reset form.
            form.reset();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
            <div className="group flex gap-x-2 items-start w-full">
                <div className="cursor-pointer hover:drop-shadow-md transition">
                    <UserAvatar src={member.profile.imageUrl} />
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center">
                            <p className="font-semibold text-sm hoverunderline cursor-pointer">
                                {member.profile.name}
                            </p>
                            <ActionTooltip label={member.role}>
                                {roleIconMap[member.role]}
                            </ActionTooltip>
                        </div>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                            {timestamp}
                        </span>
                    </div>
                    {isImage && (
                        <a
                            className="
                                relative aspect-square rounded-md mt-2 overflow-hidden border flex
                                items-center bg-secondary h-48 w-48
                            "
                            target="_blank"
                            rel="noopener noreferrer"
                            href={fileUrl}
                        >
                            <Image
                                className="object-cover"
                                src={fileUrl}
                                alt={content}
                                fill
                            />
                        </a>
                    )}
                    {isPDF && (
                        <div className="relative flex items-central p-2 mt-2 rounded-md bg-background/10">
                            <FileIcon className="w-10 h-10 fill-indigo-200 stroke-indigo-400" />
                            <a
                                className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={fileUrl as string}
                            >
                                PDF File
                            </a>
                        </div>
                    )}
                    {!fileUrl && !isEditing && (
                        <p
                            className={cn(
                                'text-sm text-zinc-600 dark:text-zinc-300',
                                deleted &&
                                    'italic text-zinc darktext-zinc-400 text-xs mt-1'
                            )}
                        >
                            {content}
                            {isUpdated && !deleted && (
                                <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                                    (edited)
                                </span>
                            )}
                        </p>
                    )}
                    {!fileUrl && isEditing && (
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
                                <Button
                                    size="sm"
                                    variant="primary"
                                    disabled={isLoading}
                                >
                                    Save
                                </Button>
                            </form>
                            <span className="text-[10px] mt-1 text-zinc-400">
                                Press escape to cancel, enter to save
                            </span>
                        </Form>
                    )}
                </div>
            </div>
            {canDeleteMessage && (
                <div
                    className="
                        hidden group-hover:flex items-center gap-x-2 absolute p-1
                        dark:bg-zinc-800 border rounded-sm bg-white right-5 -top-2
                    "
                >
                    {canEditMessage && (
                        <ActionTooltip label="Edit">
                            <Edit
                                className="
                                    cursor-pointer ml-auto w-4 h-4 text-zinc-500
                                    hover:text-zinc-600 dark:hover:text-zinc-300
                                    transition
                                "
                                onClick={() => setIsEditing(true)}
                            />
                        </ActionTooltip>
                    )}
                    <ActionTooltip label="Delete">
                        <Trash
                            className="
                                cursor-pointer ml-auto w-4 h-4 text-zinc-500
                                hover:text-zinc-600 dark:hover:text-zinc-300
                                transition
                            "
                        />
                    </ActionTooltip>
                </div>
            )}
        </div>
    );
};
