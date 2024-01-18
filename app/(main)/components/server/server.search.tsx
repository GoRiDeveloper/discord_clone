'use client';

import type { FC, JSX } from 'react';

import {
    CommandDialog,
    CommandEmpty,
    CommandInput,
    CommandList,
} from '@/components/ui/command';
import { useToggle } from '@/hooks';
import { ServerSearchData } from '../../models';
import { useServerSearch } from '../../hooks';
import { SearchItem, ServerSearchButton } from './';

/**
 * Search server information interface.
 */
interface ServerSearchProps {
    data: ServerSearchData[];
}

/**
 * Input component and search modal.
 *
 * @param { ServerSearchProps } param0 - Search server information props.
 *
 * @returns { JSX.Element } Input component and search modal.
 */
export const ServerSearch: FC<ServerSearchProps> = ({
    data,
}: ServerSearchProps): JSX.Element => {
    // Status to check if the search engine is open.
    const { status: open, toggleStatus: setOpen } = useToggle();

    useServerSearch({ setOpen });

    return (
        <div className="mt-2">
            <ServerSearchButton setOpen={setOpen} />
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search all channels and members" />
                <CommandList>
                    <CommandEmpty> No Results Found </CommandEmpty>
                    {data.map(({ label, type, data }) => (
                        <SearchItem
                            key={label}
                            label={label}
                            type={type}
                            data={data}
                            setOpen={setOpen}
                        />
                    ))}
                </CommandList>
            </CommandDialog>
        </div>
    );
};
