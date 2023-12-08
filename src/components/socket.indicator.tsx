'use client';

import type { FC, JSX } from 'react';

import { Badge } from '@/components';
import { useSocketContext } from '@/hooks';

/**
 * Socket indicator component.
 *
 * @returns { JSX.Element } Socket indicator component.
 */
export const SocketIndicator: FC = (): JSX.Element => {
    // Deconstruct socket functionalities.
    const { isConnected } = useSocketContext();

    // If the socket is disconnected, show an indicator of this.
    if (!isConnected) {
        return (
            <Badge
                variant="outline"
                className="bg-yellow-600 text-white border-none"
            >
                Fallback: Polling every 1s
            </Badge>
        );
    }

    return (
        <Badge
            variant="outline"
            className="bg-emerald-600 text-white border-none"
        >
            Live: Real-time updates
        </Badge>
    );
};
