import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { db, getProfile } from '@/lib';
import { APP_CHANNELS, AppRoutes, BASE_URL } from '@/models';

/**
 * Model for channel id props.
 */
interface UseChannelIdProps {
    serverId: string;
    channelId: string;
}

/**
 * Hook to get the information of the current member and a specific channel.
 *
 * @param { UseChannelIdProps } param0 - Channel id props.
 */
export const useChannelId = async ({
    serverId,
    channelId,
}: UseChannelIdProps) => {
    const { getAuthProfile } = await getProfile();

    /**
     * The current profile in session.
     */
    const profile = getAuthProfile();

    // Check if the profile exists, if not, redirect to authenticate.
    if (!profile) {
        return redirectToSignIn({
            returnBackUrl: BASE_URL,
        });
    }

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

    /**
     * General channel.
     */
    const generalChannel = await db.channel.findFirst({
        where: {
            name: APP_CHANNELS.GENERAL,
            serverId,
        },
    });

    if (!generalChannel) {
        redirect(AppRoutes.HOME);
    }

    // If the specific member or channel is not found, return to the main page.
    if (!channel || !member) redirect(AppRoutes.HOME);

    return { channel, member, generalChannelId: generalChannel.id };
};
