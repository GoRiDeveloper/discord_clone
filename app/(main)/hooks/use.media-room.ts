'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ApiRoutes, AppRoutes } from '@/models';

/**
 * Model for use media room hook props.
 */
interface UseMediaRoomProps {
    chatId: string;
    params: {
        serverId: string;
        channelId: string;
    };
}

/**
 * Hook to manage information from the media section.
 *
 * @param { UseMediaRoomProps } param0 - Props for media room.
 */
export const useMediaRoom = ({ chatId, params }: UseMediaRoomProps) => {
    // Authenticated user information.
    const { user } = useUser();

    /**
     * App router.
     */
    const router = useRouter();

    // State to store the token.
    const [token, setToken] = useState<string>('');

    useEffect(() => {
        // If there is no first or last name in the user information, exit the function.
        if (!user?.fullName) return;

        (async () => {
            try {
                /**
                 * Request to get livekit api information.
                 */
                const res = await fetch(
                    ApiRoutes.livekitApi(chatId, user?.fullName as string)
                );

                /**
                 * Transform the response to json.
                 */
                const data = await res.json();

                // Store the token in the state.
                setToken(data.token);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [user?.fullName, chatId]);

    /**
     * Function to redirect to general server chat.
     *
     * @returns { void } Redirection to general chat.
     */
    const redirectToGeneral = (): void => {
        return router.push(
            AppRoutes.CHANNEL_ID(params.serverId, params.channelId)
        );
    };

    return { token, redirectToGeneral };
};
