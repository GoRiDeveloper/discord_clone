import { redirectToSignIn } from '@clerk/nextjs';

import { BASE_URL } from '@/models';
import { db, getProfile } from './';

/**
 * Function to get the initial user.
 *
 * @returns { Promise<any> } Function to get the initial user.
 */
export const initialProfile = async (): Promise<any> => {
    const { getAuthProfile } = await getProfile(undefined, undefined, true);

    /**
     * Reference to save the current user if it exists.
     */
    const user = getAuthProfile();

    // Check if the profile exists, if not, redirect to authenticate.
    if (!user) {
        return redirectToSignIn({
            returnBackUrl: BASE_URL,
        });
    }

    /**
     * Reference to save the found user in the database.
     */
    const profile = await db.profile.findUnique({
        where: {
            userId: user.id,
        },
    });

    // Check if the user was found in the database, and we return it.
    if (profile) return profile;

    /**
     * Reference to create the user in the database.
     */
    const newProfile = await db.profile.create({
        data: {
            userId: user.id,
            name: `${user.firstName} ${user.lastName || ''}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress,
        },
    });

    // Return to the created user.
    return newProfile;
};
