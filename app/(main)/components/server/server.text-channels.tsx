import type { FC, JSX } from 'react';
import { ChannelType } from '@prisma/client';

import { ServerSection, ServerChannel } from './';
import { ServerInfoProps } from '../../models';

/**
 * Server text channels component.
 *
 * @param { ServerIdParams } param0 - Server id params.
 *
 * @returns { Promise<JSX.Element> } Server text channels component.
 */
export const ServerTextChannels: FC<ServerInfoProps> = async ({
    channels,
    userRole,
    server,
}: ServerInfoProps): Promise<JSX.Element> => {
    return (
        <>
            {!!channels?.length && (
                <div className="mb-2">
                    <ServerSection
                        sectionType="channels"
                        channelType={ChannelType.TEXT}
                        role={userRole}
                        label="Text Channels"
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
