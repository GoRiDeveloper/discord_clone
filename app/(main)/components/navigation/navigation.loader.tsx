import type { FC, JSX } from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Navigation loader component.
 *
 * @returns { JSX.Element }
 */
export const NavigationLoader: FC = (): JSX.Element => {
    return (
        <Loader2 className="flex-1 w-8 h-8 text-zinc-500 animate-spin my-4" />
    );
};
