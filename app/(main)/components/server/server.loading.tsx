import type { FC, JSX } from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Server loading component.
 *
 * @returns { JSX.Element } Server loading component.
 */
export const ServerLoading: FC = (): JSX.Element => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin" />
        </div>
    );
};
