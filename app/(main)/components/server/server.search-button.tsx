'use client';

import { Search } from 'lucide-react';
import type { FC, JSX } from 'react';

import { ServerSearchProps } from '../../models';

/**
 * Server search button.
 *
 * @param { ServerSearchProps } param0 - Server search button props.
 *
 * @returns { JSX.Element } Server search button.
 */
export const ServerSearchButton: FC<ServerSearchProps> = ({
    setOpen,
}: ServerSearchProps): JSX.Element => {
    return (
        <button
            className="
                group px-2 py-2 rounded-md flex items-center gap-x-2
                w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50
                transition
            "
            onClick={() => setOpen()}
        >
            <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
            <p
                className="
                    font-semibold text-sm text-zinc-500 dark:text-zinc-400
                    group-hover:text-zinc-600 dark:group-hover:text-zinc-300
                    transition
                "
            >
                Search
            </p>
            <kbd
                className="
                    pointer-events-none inline-flex h-5 select-none items-center
                    gap-1 rounded border bg-muted px-1.5 font-mono text-[10px]
                    font-medium text-muted-foreground ml-auto
                "
            >
                <span className="text-xs">CTRL</span>K
            </kbd>
        </button>
    );
};
