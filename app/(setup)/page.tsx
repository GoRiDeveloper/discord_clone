import type { FC, JSX } from 'react';

import { InitialModal } from '@/components/modals/initial.modal';
import { initialProfile } from '@/lib';
import { redirectToSpecificServer } from '@/lib/server';

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

    redirectToSpecificServer({
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
