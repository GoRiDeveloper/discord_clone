import type { FC, JSX } from 'react';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { ChatHeader } from '@/components';
import { currentProfile, db } from '@/lib';

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
    /**
     * The current profile in session.
     */
    const profile = await currentProfile();

    // If there is no profile in session, return a non-authorization response.
    if (!profile) return redirectToSignIn();

    /**
     * Channel id found.
     */
    const channel = await db.channel.findUnique({
        where: {
            id: channelId,
        },
    });

    /**
     * First member found on server using parameters.
     */
    const member = await db.member.findFirst({
        where: {
            serverId: serverId,
            profileId: profile.id,
        },
    });

    // If the specific member or channel is not found, return to the main page.
    if (!channel || !member) redirect('/');

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader
                serverId={serverId}
                name={channel.name}
                type={'channel'}
            />
        </div>
    );
};

export default ChannelIdPage;
