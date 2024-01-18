import type { FC, JSX } from 'react';

import { initialProfile, redirectToSpecificServer } from '@/lib';
import { InitialModal } from './components';

/**
 * Setup page component.
 *
 * @returns { Promise<JSX.Element> } Setup page component.
 */
const SetupPage: FC = async (): Promise<JSX.Element> => {
    /**
     * Reference to obtain the user profile.
     */
    const profile = await initialProfile();

    await redirectToSpecificServer({
        profileId: profile.id,
        inviteCodeRedirect: false,
    });

    return (
        <div className="max-w-full w-full h-full">
            <InitialModal />
        </div>
    );
};

export default SetupPage;
