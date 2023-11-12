import { currentUser, redirectToSignIn } from '@clerk/nextjs';
import { db } from './db';

/**
 * Function to get the initial user.
 *
 * @returns { Promise<any> } Function to get the initial user.
 */
export const initialProfile = async (): Promise<any> => {
    /**
     * Reference to save the current user if it exists.
     */
    const user = await currentUser();

    // Check if the user exists, if not, redirect the user to authenticate.
    if (!user) return redirectToSignIn();

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
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress,
        },
    });

    // Return to the created user.
    return newProfile;
};
