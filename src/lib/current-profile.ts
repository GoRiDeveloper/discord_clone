import { auth } from '@clerk/nextjs';
import { db } from '@/lib';

/**
 * Function to get current profile.
 *
 * @returns Current profile.
 */
export const currentProfile = async () => {
    /**
     * The current user if it exists.
     */
    const { userId } = auth();

    // Check if the user exists, if not, return null.
    if (!userId) return null;

    /**
     * Profile in the database.
     */
    const profile = await db.profile.findUnique({
        where: {
            userId,
        },
    });

    // Return profile information.
    return profile;
};
