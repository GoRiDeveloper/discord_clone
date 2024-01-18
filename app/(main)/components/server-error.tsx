import type { FC, JSX } from 'react';
import { ServerCrash } from 'lucide-react';

/**
 * Server error component.
 *
 * @returns { JSX.Element } Server error component.
 */
export const ServerError: FC = (): JSX.Element => {
    return (
        <div className="flex flex-col flex-1 justify-center items-center">
            <ServerCrash className="w-7 h-7 text-zinc-500 my-4" />
            <p className="text-xs dark:text-zinc-400">
                {' '}
                Something went wrong!{' '}
            </p>
        </div>
    );
};
