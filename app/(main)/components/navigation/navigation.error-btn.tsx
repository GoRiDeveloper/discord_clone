'use client';

import { RotateCw } from 'lucide-react';
import type { FC, JSX } from 'react';

import { useError } from '../../hooks';

/**
 * Navigation error button component.
 */
export const NavigationErrorBtn: FC = (): JSX.Element => {
    const { handleReload } = useError();

    return (
        <button
            className="cursor-pointer flex items-center justify-center flex-col flex-1"
            onClick={handleReload}
        >
            <RotateCw className="w-6 h-6" />
            <p className="text-red-500"> ¡Error! </p>
        </button>
    );
};
