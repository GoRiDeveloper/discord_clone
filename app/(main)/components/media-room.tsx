'use client';

import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import '@livekit/components-styles';
import type { FC, JSX } from 'react';

import { useMediaRoom } from '../hooks';
import { Loader } from '@/components';

/**
 * Model for Media Room component.
 */
interface MediaRoomProps {
    chatId: string;
    video: boolean;
    audio: boolean;
    params: {
        serverId: string;
        channelId: string;
    };
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
    params,
}: MediaRoomProps): JSX.Element => {
    // State of the token.
    const { token, redirectToGeneral } = useMediaRoom({ chatId, params });

    // If the token does not exist, return a payload component.
    if (!token) {
        return <Loader title="Loading..." />;
    }

    return (
        <LiveKitRoom
            data-lk-theme="default"
            connect={true}
            token={token}
            video={video}
            audio={audio}
            onDisconnected={redirectToGeneral}
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            style={{ height: '100dvh' }}
        >
            <VideoConference />
        </LiveKitRoom>
    );
};
