import type { FC, JSX } from 'react';
import { ChannelType } from '@prisma/client';

import { MediaRoom } from '../../../../../components';
import { ChatMessages, ChatHeader } from '../../../../../components/chat';
import { ChatInput } from '../../../../../components/chat/chat.input';
import { useChannelId } from './hooks';
import {
    ChatType,
    ParamKeyModel,
    MessagesApiRoutes,
} from '../../../../../models';

/**
 * Channel id page properties model.
 */
interface ChannelIdPageProps {
    params: {
        serverId: string;
        channelId: string;
    };
}

/**
 * Channel Id Page.
 *
 * @param { ChannelIdPageProps } param0 - Channel id page props.
 *
 * @returns { JSX.Element } Channel Id Page.
 */
const ChannelIdPage: FC<ChannelIdPageProps> = async ({
    params: { serverId, channelId },
}: ChannelIdPageProps): Promise<JSX.Element> => {
    // Channel id found and first member found on server using parameters.
    const { channel, member, generalChannelId } = await useChannelId({
        serverId,
        channelId,
    });

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader
                serverId={serverId}
                name={channel?.name}
                type={ChatType.channel}
            />
            {channel.type === ChannelType.TEXT && (
                <>
                    <ChatMessages
                        paramKey={ParamKeyModel.CHANNEL_KEY}
                        type={ChatType.channel}
                        apiUrl={MessagesApiRoutes.MESSAGES}
                        socketUrl={MessagesApiRoutes.MESSAGES_SOCKET}
                        member={member}
                        name={channel.name}
                        paramValue={channel.id}
                        chatId={channel.id}
                        socketQuery={{
                            channelId: channel.id,
                            serverId: channel.serverId,
                        }}
                    />
                    <ChatInput
                        apiUrl={MessagesApiRoutes.MESSAGES_SOCKET}
                        name={channel.name}
                        type={ChatType.channel}
                        query={{
                            channelId,
                            serverId,
                        }}
                    />
                </>
            )}
            {channel.type === ChannelType.AUDIO && (
                <MediaRoom
                    chatId={channel.id}
                    audio={true}
                    video={false}
                    params={{ serverId, channelId: generalChannelId }}
                />
            )}
            {channel.type === ChannelType.VIDEO && (
                <MediaRoom
                    chatId={channel.id}
                    audio={false}
                    video={true}
                    params={{ serverId, channelId: generalChannelId }}
                />
            )}
        </div>
    );
};

export default ChannelIdPage;
