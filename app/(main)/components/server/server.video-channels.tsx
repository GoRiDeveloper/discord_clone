'use client';

import { ChannelType } from '@prisma/client';
import type { FC, JSX } from 'react';

import type { ServerInfoProps } from '../../models';
import { ServerChannel, ServerSection } from './';

/**
 * Server video channels component.
 *
 * @param { ServerIdParams } param0 - Server id params.
 *
 * @returns { Promise<JSX.Element> } Server video channels component.
 */
export const ServerVideoChannels: FC<ServerInfoProps> = ({
    channels,
    server,
    userRole,
}: ServerInfoProps): JSX.Element => {
    return (
        <>
            {!!channels?.length && (
                <div className="mb-2">
                    <ServerSection
                        sectionType="channels"
                        channelType={ChannelType.VIDEO}
                        role={userRole}
                        label="Video Channels"
                    />
                    <div className="space-y-[2px]">
                        {channels.map((channel) => (
                            <ServerChannel
                                key={channel.id}
                                channel={channel}
                                role={userRole}
                                server={server}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};
