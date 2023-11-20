import { redirect } from 'next/navigation';
import type { FC, JSX } from 'react';

import { InitialModal } from '@/components/modals/initial.modal';
import { db, initialProfile } from '@/lib';

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

    /**
     * Reference to get the first server where a user exists in the database.
     */
    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id,
                },
            },
        },
    });

    // Check if any server exists, to redirect the user to that first instance server.
    if (server) return redirect(`/servers/${server.id}`);

    return (
        <div className="max-w-full w-full h-full">
            <InitialModal />
        </div>
    );
};

export default SetupPage;
