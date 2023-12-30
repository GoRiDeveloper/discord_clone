'use client';

import { Video, VideoOff } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import type { FC, JSX } from 'react';

import { ActionTooltip } from '@/components/action-tooltip';

/**
 * Component to control the call in a conversation.
 *
 * @returns { JSX.Element } Component to control the call in a conversation.
 */
export const ChatVideoButton: FC = (): JSX.Element => {
    /**
     * App router.
     */
    const router = useRouter();

    /**
     * Pathname.
     */
    const pathname = usePathname();

    /**
     * Search url params.
     */
    const searchParams = useSearchParams();

    /**
     * Is video boolean in search params.
     */
    const isVideo = searchParams?.get('video');

    /**
     * Call type button.
     */
    const Icon = isVideo ? VideoOff : Video;

    /**
     * Type call label.
     */
    const tooltipLabel = isVideo ? 'End video call' : 'Start video call';

    /**
     * Call control function.
     */
    const onClick = () => {
        /**
         * Url to control the call.
         */
        const url = qs.stringifyUrl(
            {
                url: pathname || '',
                query: {
                    video: isVideo ? undefined : true,
                },
            },
            { skipNull: true }
        );

        // Redirect to call.
        router.push(url);
    };

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
