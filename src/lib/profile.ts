import { redirectToSignIn } from '@clerk/nextjs';

import { currentProfile } from './current-profile';

/**
 * .
 */
export const getAuthProfile = async () => {
    /**
     * The current profile in session.
     */
    const profile = await currentProfile();

    // Check if the profile exists, if not, redirect to authenticate.
    if (!profile)
        return redirectToSignIn({
            returnBackUrl: 'http://localhost:3000/',
        });
        
    return profile;
};
