import type { FC, JSX } from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Model for Loader props.
 */
interface LoaderProps {
    title: string;
}

/**
 * Load component for a section.
 *
 * @returns { JSX.Element } Load component for a section.
 */
export const Loader: FC<LoaderProps> = ({
    title,
}: LoaderProps): JSX.Element => {
    return (
        <div className="flex flex-col-flex-1 justify-center items-center h-full">
            <Loader2 className="w-7 h-7 text-zinc-500 animate-spin my-4" />
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {' '}
                {title}{' '}
            </p>
        </div>
    );
};
