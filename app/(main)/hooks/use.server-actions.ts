import type { MouseEvent } from 'react';
import type { Server } from '@prisma/client';

import { useModal } from '@/hooks';
import type { ServerChannelProps } from '../models';
import type { ModalType } from '@/models';

/**
 * Hook for channel button functionalities.
 *
 * @param { ServerChannelProps } param0 - Use server actions hook props.
 */
export const useServerActions = ({ channel, server }: ServerChannelProps) => {
    // Modal store functionalities.
    const { onOpen } = useModal();

    /**
     * Function to trigger a specific modal.
     *
     * @param { MouseEvent<SVGSVGElement> } e - Event to trigger via svg.
     * @param { ModalType } action - Type of modal to activate.
     */
    const onAction = (e: MouseEvent<SVGSVGElement>, action: ModalType) => {
        e.stopPropagation();
        onOpen(action, { channel, server: server as Server });
    };

    return { onAction };
};
