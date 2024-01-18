import { Edit, Trash } from 'lucide-react';
import type { Dispatch, FC, JSX, SetStateAction } from 'react';

import { ActionTooltip } from '@/components';
import { useModal } from '@/hooks';
import { ModalType } from '@/models';

/**
 * Model for chat item options buttons props.
 */
interface ChatItemOptionsButtonsProps {
    id: string;
    socketUrl: string;
    socketQuery: Record<string, any>;
    canEditMessage: boolean;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
}

/**
 * Chat item options buttons component.
 *
 * @param { ChatItemOptionsButtonsProps } param0 - Chat item options buttons props.
 *
 * @returns { JSX.Element } Chat item options buttons component.
 */
export const ChatItemOptionsButtons: FC<ChatItemOptionsButtonsProps> = ({
    id,
    socketUrl,
    canEditMessage,
    socketQuery,
    setIsEditing,
}: ChatItemOptionsButtonsProps): JSX.Element => {
    // Modal store functionalities.
    const { onOpen } = useModal();

    return (
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
                    onClick={() =>
                        onOpen(ModalType.DELETE_MESSAGE, {
                            apiUrl: `${socketUrl}/${id}`,
                            query: socketQuery,
                        })
                    }
                />
            </ActionTooltip>
        </div>
    );
};
