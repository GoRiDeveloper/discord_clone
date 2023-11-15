import type { FC, JSX } from 'react';
import { UserButton } from '@clerk/nextjs';

import { ModeToggle } from '@/components';

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
                afterSignOutUrl="/"
                appearance={{
                    elements: {
                        avatarBox: 'h-[48px] w-[48px]',
                    },
                }}
            />
        </div>
    );
};
