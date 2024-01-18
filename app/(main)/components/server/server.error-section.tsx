'use client';

import type { FC, JSX } from 'react';

import { ServerError } from '../';
import { useError } from '../../hooks';

/**
 * Server error section.
 *
 * @returns { JSX.Element } Server error section.
 */
export const ServerErrorSection: FC = (): JSX.Element => {
    const { handleReload } = useError();

    return (
        <button
            className="w-full h-full flex items-center cursor-pointer"
            onClick={handleReload}
        >
            <ServerError />
        </button>
    );
};
