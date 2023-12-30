'use client';

import { useState, useEffect, type FC, type JSX } from 'react';
import { Channel } from '@prisma/client';
import { useUser } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import { LiveKitRoom, VideoConference } from '@livekit/components-react';

/**
 * Model for Media Room component.
 */
interface MediaRoomProps {
    chatId: string;
    video: boolean;
    audio: boolean;
}

/**
 * Media channels component.
 *
 * @param { MediaRoomProps } param0 - Media channels props.
 *
 * @returns { JSX.Element } Media channels component.
 */
export const MediaRoom: FC<MediaRoomProps> = ({
    chatId,
    video,
    audio,
}: MediaRoomProps): JSX.Element => {
    // Authenticated user information.
    const { user } = useUser();

    // State to store the token.
    const [token, setToken] = useState<string>('');

    useEffect(() => {
        // If there is no first or last name in the user information, exit the function.
        if (!user?.firstName || !user?.lastName) return;

        /**
         * User name.
         */
        const name = `${user.firstName} ${user.lastName}`;

        (async () => {
            try {
                /**
                 * Request to get livekit api information.
                 */
                const res = await fetch(
                    `/api/livekit?room=${chatId}&username=${name}`
                );

                /**
                 * Transform the response to json.
                 */
                const data = await res.json();

                // Store the token in the state.
                setToken(data.token);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [user?.firstName, user?.lastName, chatId]);

    // If the token does not exist, we return a payload component.
    if (!token) {
        return (
            <div className="flex flex-col-flex-1 justify-center items-center">
                <Loader2 className="w-7 h-7 text-zinc-500 animate-spin my-4" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {' '}
                    Loading...{' '}
                </p>
            </div>
        );
    }

    return (
        <LiveKitRoom
            data-lk-theme="default"
            connect={true}
            token={token}
            video={video}
            audio={audio}
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        >
            <VideoConference />
        </LiveKitRoom>
    );
};
