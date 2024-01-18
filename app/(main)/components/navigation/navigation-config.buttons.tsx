import { UserButton } from '@clerk/nextjs';
import type { FC, JSX } from 'react';

import { ModeToggle } from '../';
import { AppRoutes } from '@/models';

/**
 * Nav configuration buttons component.
 *
 * @returns { JSX.Element } Nav configuration buttons component.
 */
export const NavigationConfigButtons: FC = (): JSX.Element => {
    return (
        <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
            <ModeToggle />
            <UserButton
                afterSignOutUrl={AppRoutes.HOME}
                appearance={{
                    elements: {
                        avatarBox: 'h-[48px] w-[48px]',
                        userButtonPopoverCard: 'pointer-events-auto',
                    },
                }}
            />
        </div>
    );
};
