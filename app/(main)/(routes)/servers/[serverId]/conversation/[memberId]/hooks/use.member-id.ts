import { redirect } from 'next/navigation';
import { redirectToSignIn } from "@clerk/nextjs";

import { db, getProfile, getOrCreateConversation } from '@/lib';
import { APP_CHANNELS, BASE_URL, AppRoutes } from '@/models';

/**
 * Model for use member id props.
 */
interface UseMemberIdProps {
    serverId: string;
    memberId: string;
}

/**
 * Hook to get the information needed for the component from a specific member.
 *
 * @param { UseMemberIdProps } param0 - Use member id props.
 */
export const useMemberId = async ({ serverId, memberId }: UseMemberIdProps) => {
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
    if (!currentMember) return redirect(AppRoutes.HOME);

    /**
     * Member conversation in session generated or found in the database.
     */
    const conversation = await getOrCreateConversation(
        currentMember.id,
        memberId
    );

    // If the conversation does not exist, we return to the server with a specific id.
    if (!conversation) return redirect(AppRoutes.SERVER_ID(serverId));

    // Destructure the members in the conversation.
    const { memberOne, memberTwo } = conversation;

    /**
     * Other member.
     */
    const otherMember =
        memberOne.profileId === profile.id ? memberTwo : memberOne;

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

    return {
        conversation,
        currentMember,
        otherMember,
        generalChannelId: generalChannel.id,
    };
};
