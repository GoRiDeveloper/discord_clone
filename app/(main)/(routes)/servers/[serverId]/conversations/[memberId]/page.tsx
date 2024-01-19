import type { FC, JSX } from 'react';

import { MediaRoom } from '../../../../../components';
import { ChatHeader, ChatMessages } from '../../../../../components/chat';
import { ChatInput } from '../../../../../components/chat/chat.input';
import {
    ChatType,
    MessagesApiRoutes,
    ParamKeyModel,
} from '../../../../../models';
import { useMemberId } from './hooks';

/**
 * Model for member id page props.
 */
interface MemberIdPageProps {
    params: {
        memberId: string;
        serverId: string;
    };
    searchParams: {
        video?: boolean;
    };
}

/**
 * Component for member id page.
 *
 * @param { MemberIdPageProps } param0 - Props for member id page.
 *
 * @returns { JSX.Element } Component for member id page.
 */
const MemberIdPage: FC<MemberIdPageProps> = async ({
    params: { serverId, memberId },
    searchParams: { video },
}: MemberIdPageProps): Promise<JSX.Element> => {
    const { conversation, currentMember, otherMember, generalChannelId } =
        await useMemberId({
            serverId,
            memberId,
        });

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader
                serverId={serverId}
                name={otherMember.profile.name}
                imageUrl={otherMember.profile.imageUrl}
                type={ChatType.conversation}
            />
            {video && (
                <MediaRoom
                    chatId={conversation.id}
                    video={true}
                    audio={true}
                    params={{ serverId, channelId: generalChannelId }}
                />
            )}
            {!video && (
                <>
                    <ChatMessages
                        name={otherMember.profile.name}
                        member={currentMember}
                        chatId={conversation.id}
                        paramValue={conversation.id}
                        type={ChatType.conversation}
                        apiUrl={MessagesApiRoutes.DIRECT_MESSAGES}
                        paramKey={ParamKeyModel.CONVERSATION_KEY}
                        socketUrl={MessagesApiRoutes.SOCKET_DIRECT_MESSAGES}
                        socketQuery={{
                            conversationId: conversation.id,
                        }}
                    />
                    <ChatInput
                        name={otherMember.profile.name}
                        type={ChatType.conversation}
                        apiUrl={MessagesApiRoutes.SOCKET_DIRECT_MESSAGES}
                        query={{
                            conversationId: conversation.id,
                        }}
                    />
                </>
            )}
        </div>
    );
};

export default MemberIdPage;
