import { Suspense, type FC, type JSX } from 'react';

import { Separator } from '@/components';
import ErrorBoundary from '@/components/error.boundary';
import { getProfile } from '@/lib';
import {
    NavigationAction,
    NavigationConfigButtons,
    NavigationItems,
    NavigationErrorBtn,
    NavigationLoader,
} from './';

/**
 * Navigation sidebar component.
 *
 * @returns { Promise<JSX.Element> } Navigation sidebar component.
 */
export const NavigationSidebar: FC = async (): Promise<JSX.Element> => {
    const { getProfileOrRedirect } = await getProfile();

    /**
     * Current profile in session.
     */
    const profile = getProfileOrRedirect();

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
            <ErrorBoundary fallback={<NavigationErrorBtn />}>
                <Suspense fallback={<NavigationLoader />}>
                    <NavigationItems profileId={profile.id} />
                </Suspense>
            </ErrorBoundary>
            <NavigationConfigButtons />
        </div>
    );
};
