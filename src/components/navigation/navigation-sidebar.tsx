import { redirect } from 'next/navigation';
import type { FC, JSX } from 'react';

import {
    NavigationItems,
    Separator,
    NavigationConfigButtons,
} from '@/components';
import { NavigationAction } from '@/components/navigation/navigation-action';
import { currentProfile } from '@/lib';

/**
 * Navigation sidebar component.
 *
 * @returns { Promise<JSX.Element> } Navigation sidebar component.
 */
export const NavigationSidebar: FC = async (): Promise<JSX.Element> => {
    /**
     * Current profile in session.
     */
    const profile = await currentProfile();

    // If the profile does not exist, we will redirect to the main route.
    if (!profile) return redirect('/');

    return (
        <div
            className="
                space-y-4 flex flex-col items-center h-full
                text-primary w-full dark:bg-[#1E1F22] py-3
                bg-[#E3E5E8]
            "
        >
            <NavigationAction />
            <Separator
                className="
                    h-[2px] bg-zinc-300 dark:bg-zinc-700
                    rounded-md w-10 mx-auto
                "
            />
            <NavigationItems profileId={profile.id} />
            <NavigationConfigButtons />
        </div>
    );
};
