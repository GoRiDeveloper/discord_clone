import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import type { FC, JSX } from 'react';

import { ChatHeader, ChatInput } from '@/components';
import { ChatMessages } from '@/components/chat/chat.messages';
import { MediaRoom } from '@/components/media-room';
import { currentProfile, db } from '@/lib';
import { getOrCreateConversation } from '@/lib/conversations';

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
    /**
     * The current profile in session.
     */
    const profile = await currentProfile();

    // Check if the profile exists, if not, redirect to authenticate.
    if (!profile)
        return redirectToSignIn({
            returnBackUrl: 'http://localhost:3000/',
        });

    /**
     * Current member in session.
     */
    const currentMember = await db.member.findFirst({
        where: {
            serverId: serverId,
            profileId: profile.id,
        },
        include: {
            profile: true,
        },
    });

    // If the current member in session is not found, we will redirect to the main page.
    if (!currentMember) return redirect('/');

    /**
     * Member conversation in session generated or found in the database.
     */
    const conversation = await getOrCreateConversation(
        currentMember.id,
        memberId
    );

    // If the conversation does not exist, we return to the server with a specific id.
    if (!conversation) return redirect(`/servers/${serverId}`);

    // Destructure the members in the conversation.
    const { memberOne, memberTwo } = conversation;

    /**
     * Other member.
     */
    const otherMember =
        memberOne.profileId === profile.id ? memberTwo : memberOne;

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col-h-full">
            <ChatHeader
                serverId={serverId}
                name={otherMember.profile.name}
                imageUrl={otherMember.profile.imageUrl}
                type="conversation"
            />
            {video && (
                <MediaRoom chatId={conversation.id} video={true} audio={true} />
            )}
            {!video && (
                <>
                    <ChatMessages
                        name={otherMember.profile.name}
                        member={currentMember}
                        chatId={conversation.id}
                        paramValue={conversation.id}
                        socketQuery={{
                            conversationId: conversation.id,
                        }}
                        type="conversation"
                        apiUrl="/api/direct-messages"
                        paramKey="conversationId"
                        socketUrl="/api/socket/direct-messages"
                    />
                    <ChatInput
                        name={otherMember.profile.name}
                        query={{
                            conversationId: conversation.id,
                        }}
                        type="conversation"
                        apiUrl="/api/socket/direct-messages"
                    />
                </>
            )}
        </div>
    );
};

export default MemberIdPage;
