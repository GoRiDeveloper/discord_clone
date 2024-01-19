import { currentUser } from '@clerk/nextjs';
import { Profile } from '@prisma/client';
import { NextApiRequest } from 'next';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

import { ApiErrors, AppRoutes, HTTP_CODE_ERRORS } from '@/models';
import { NextApiResponseServerIo } from '@/types';
import { currentProfile } from './current-profile';
import { currentProfilePages } from './current-profile-pages';

/**
 * Function to manage global user profile information.
 *
 * @param { NextApiRequest } req - Next api route request.
 * @param { NextApiResponseServerIo } res - Next Socket Friendly API Route Answer.
 */
export const getProfile = async (
    req?: NextApiRequest,
    res?: NextApiResponseServerIo,
    clerkUser?: boolean
) => {
    /**
     * The current profile in session.
     */
    let profile: Profile | null = null;

    if (req && res) {
        profile = await currentProfilePages(req);
    } else if (clerkUser) {
        profile = (await currentUser()) as any;
    } else {
        profile = await currentProfile();
    }

    /**
     * Function to obtain the information of the authenticated user.
     */
    const getAuthProfile = (): any | Profile => profile;

    /**
     * Function to obtain the information of the authenticated user in the server.
     */
    const getServerProfile = () => {
        console.log({ profile });
        // If there is no profile in session, return a non-authorization response.
        if (!profile)
            return new NextResponse(ApiErrors.UNAUTHORIZED, {
                status: HTTP_CODE_ERRORS.UNAUTHORIZED,
            });

        return profile;
    };

    /**
     * Function to obtain the information of the authenticated user in the pages server.
     */
    const getPagesServerProfile = () => {
        if (!req || !res) {
            if (!res) throw new Error(ApiErrors.INTERNAL_ERROR);
            return res.status(HTTP_CODE_ERRORS.INTERNAL_ERROR).json({
                error: ApiErrors.INTERNAL_ERROR,
            });
        }

        // If there is no user logged in, we return an unauthorized error.
        if (!profile) {
            return res.status(HTTP_CODE_ERRORS.UNAUTHORIZED).json({
                error: ApiErrors.UNAUTHORIZED,
            });
        }

        return profile;
    };

    /**
     * Function to get the profile in session.
     *
     * @returns { Profile | never } User profile or redirect.
     */
    const getProfileOrRedirect = (): Profile | never => {
        // If the profile does not exist, we will redirect to the main route.
        if (!profile) return redirect(AppRoutes.HOME);

        return profile;
    };

    return {
        getProfileOrRedirect,
        getAuthProfile,
        getServerProfile,
        getPagesServerProfile,
    };
};
