'use client';

import type { FC, JSX, ReactNode } from 'react';

import { CommandGroup, CommandItem } from '@/components';
import { useRedirect } from '../../hooks';
import type { ServerSearchData, ServerSearchProps } from '../../models';

/**
 * Model for search items props.
 */
type SearchItemProps = ServerSearchData & ServerSearchProps;

/**
 * Search item component.
 *
 * @param { SearchItemProps } param0 - Search item props.
 *
 * @returns { JSX.Element | null } Search item component.
 */
export const SearchItem: FC<SearchItemProps> = ({
    data,
    type,
    label,
    setOpen,
}: SearchItemProps): JSX.Element | null => {
    const { onRedirect } = useRedirect({
        setOpen,
    });

    // If the information length is false, return null.
    if (!data?.length) return null;

    return (
        <CommandGroup key={label} heading={label}>
            {data?.map(({ id, icon, name }) => (
                <CommandItem key={id} onSelect={() => onRedirect({ id, type })}>
                    {icon as ReactNode}
                    <span>{name}</span>
                </CommandItem>
            ))}
        </CommandGroup>
    );
};
