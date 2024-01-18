import type { FC, JSX } from 'react';
import { Edit, Trash } from 'lucide-react';

import { ActionTooltip } from '@/components';
import { ModalType } from '@/models';
import type { ServerChannelProps } from '../../models';
import { useServerActions } from '../../hooks';

/**
 * Server channel options component.
 *
 * @param { ServerChannelProps } param0 - Server channel props.
 *
 * @returns { JSX.Element } Server channel options component.
 */
export const ServerChannelOptions: FC<ServerChannelProps> = ({
    server,
    channel,
}: ServerChannelProps): JSX.Element => {
    const { onAction } = useServerActions({
        server,
        channel,
    });

    return (
        <div className="ml-auto flex items-center gap-x-w">
            <ActionTooltip label="Edit">
                <Edit
                    className="
                        hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600
                        dark:text-zinc-400dark:hover:text-zinc-300 transition
                    "
                    onClick={(e) => onAction(e, ModalType.EDIT_CHANNEL)}
                />
            </ActionTooltip>
            <ActionTooltip label="Trash">
                <Trash
                    className="
                        hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600
                        dark:text-zinc-400dark:hover:text-zinc-300 transition
                    "
                    onClick={(e) => onAction(e, ModalType.DELETE_CHANNEL)}
                />
            </ActionTooltip>
        </div>
    );
};
