import { auth } from '@clerk/nextjs';
import { db } from '@/lib';

export const currentProfile = async () => {
    /**
     * Reference to save the current user if it exists.
     */
    const { userId } = auth();

    // Check if the user exists, if not, return null.
    if (!userId) return null;

    /**
     * Reference to save the found profile in the database.
     */
    const profile = await db.profile.findUnique({
        where: {
            userId,
        },
    });

    // Return profile information.
    return profile;
};
