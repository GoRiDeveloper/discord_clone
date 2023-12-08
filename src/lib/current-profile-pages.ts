import { getAuth } from '@clerk/nextjs/server';
import { NextApiRequest } from 'next';

import { db } from '@/lib';

/**
 * Function to get current profile.
 *
 * @returns Current profile.
 */
export const currentProfilePages = async (req: NextApiRequest) => {
    /**
     * The current user if it exists.
     */
    const { userId } = getAuth(req);

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
