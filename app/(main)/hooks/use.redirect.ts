'use client';

import { useParams, useRouter } from 'next/navigation';

import { AppRoutes, ChannelsTypes } from '@/models';
import { ServerSearchProps } from '../models';

/**
 * Hook for redirection functionalities.
 *
 * @param { ServerSearchProps } param0 - Server search props.
 */
export const useRedirect = ({ setOpen }: ServerSearchProps) => {
    /**
     * App router.
     */
    const router = useRouter();

    /**
     * Url page params.
     */
    const params = useParams();

    /**
     * Model for redirect function properties.
     */
    interface RedirectProps {
        id: string;
        type: ChannelsTypes;
    }

    /**
     * Redirect user feature.
     *
     * @param { RedirectProps } param0 - Redirect function props.
     *
     * @returns { void } User redirect.
     */
    const onRedirect = ({ id, type }: RedirectProps): void => {
        // If the key pressed is "k", or "ctrl", or "metaKey", change the state of the search modal.
        setOpen();

        // If the search type is member, redirect the user to conversations with that member.
        if (type === ChannelsTypes.member)
            return router.push(AppRoutes.MEMBER_ID(params?.serverId, id));

        // If the search type is a channel, redirect the user to the specified channel.
        if (type === ChannelsTypes.channel)
            return router.push(AppRoutes.CHANNEL_ID(params?.serverId, id));
    };

    return { onRedirect };
};
