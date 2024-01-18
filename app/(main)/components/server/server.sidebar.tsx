import type { FC, JSX } from 'react';

import { ScrollArea, Separator } from '@/components';
import type { ServerIdProps } from '@/models';
import { getServerInfo } from '../../lib';
import {
    ServerAudioChannels,
    ServerHeader,
    ServerMembers,
    ServerSearch,
    ServerTextChannels,
    ServerVideoChannels,
} from './';

/**
 * Server sidebar component.
 *
 * @param { ServerSidebarProps } param0 - Server sidebar component props.
 *
 * @returns { Promise<JSX.Element> } Server sidebar component.
 */
export const ServerSidebar: FC<ServerIdProps> = async ({
    serverId,
}: ServerIdProps): Promise<JSX.Element> => {
    const { server, serverInfo } = await getServerInfo(serverId);

    return (
        <div
            className="
                flex flex-col h-full text-primary w-full dark:bg-[#2B2D31]
                bg-[#F2F3F5]
            "
        >
            <ServerHeader server={server} userRole={serverInfo.userRole} />
            <ScrollArea className="flex-1 px-3">
                <ServerSearch data={serverInfo.serverData} />
                <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
                <ServerTextChannels
                    channels={serverInfo?.textChannels}
                    server={server}
                    userRole={serverInfo.userRole}
                />
                <ServerAudioChannels
                    channels={serverInfo?.audioChannels}
                    server={server}
                    userRole={serverInfo.userRole}
                />
                <ServerVideoChannels
                    channels={serverInfo?.videoChannels}
                    server={server}
                    userRole={serverInfo.userRole}
                />
                <ServerMembers
                    members={serverInfo?.members}
                    server={server}
                    userRole={serverInfo.userRole}
                />
            </ScrollArea>
        </div>
    );
};
