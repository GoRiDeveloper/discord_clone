import type { FC, JSX } from 'react';
import { Plus } from 'lucide-react';

import { useModal } from '@/hooks';
import { ModalType } from '@/models';

/**
 * Model for message media button props.
 */
interface MessageMediaBittonProps {
    apiUrl: string;
    query: Record<string, any>;
}

/**
 * Component for files button.
 *
 * @param { MessageMediaBittonProps } param0 - Message media button props.
 *
 * @returns { JSX.Element } Component for files button.
 */
export const MessageMediaButton: FC<MessageMediaBittonProps> = ({
    apiUrl,
    query,
}: MessageMediaBittonProps): JSX.Element => {
    // Modal store functionalities.
    const { onOpen } = useModal();

    return (
        <button
            className="
                absolute top-7 left-8 w-[24px] h-[24px] bg-zinc-500 flex
                dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300
                transition rounded-full p-1 items-center justify-center
            "
            type="button"
            onClick={() =>
                onOpen(ModalType.MESSAGE_FILE, {
                    apiUrl,
                    query,
                })
            }
        >
            <Plus className="text-white dark:text-[#313338]" />
        </button>
    );
};
