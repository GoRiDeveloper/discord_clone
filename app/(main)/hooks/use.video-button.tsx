'use client';

import qs from 'query-string';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { VideoOff, Video } from 'lucide-react';

import { SearchParamsModel } from '@/models';

/**
 * Hook to handle video button information.
 */
export const useVideoButton = () => {
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
    const isVideo = searchParams?.get(SearchParamsModel.VIDEO);

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

    return { Icon, tooltipLabel, onClick };
};
