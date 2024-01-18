'use client';

import type { FC, JSX } from 'react';

import { ActionTooltip } from '@/components/action/action-tooltip';
import { useVideoButton } from '../../hooks';

/**
 * Component to control the call in a conversation.
 *
 * @returns { JSX.Element } Component to control the call in a conversation.
 */
export const ChatVideoButton: FC = (): JSX.Element => {
    const { tooltipLabel, Icon, onClick } = useVideoButton();

    return (
        <ActionTooltip side="bottom" label={tooltipLabel}>
            <button
                className="hover:opacity-75 transition mr-4"
                onClick={onClick}
            >
                <Icon className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
            </button>
        </ActionTooltip>
    );
};
