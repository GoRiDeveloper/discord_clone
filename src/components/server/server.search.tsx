'use client';

import { useState, useEffect, type FC, type JSX, type ReactNode } from 'react';
import { Search } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';

import {
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandItem,
    CommandGroup,
} from '@/components/ui/command';

/**
 * Typed for search types
 */
type SearchType = 'channel' | 'member';

/**
 * Icons information interface.
 */
interface IconData {
    icon: ReactNode;
    name: string;
    id: string;
}

/**
 * Search server information interface.
 */
interface ServerSearchData {
    label: string;
    type: SearchType;
    data: IconData[] | undefined;
}

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
    const [open, setOpen] = useState(false);

    /**
     * App router.
     */
    const router = useRouter();

    /**
     * Url page params.
     */
    const params = useParams();

    useEffect(() => {
        /**
         * Function to check which key the user presses and activate the search mode.
         *
         * @param { KeyboardEvent } e - Key pressed event.
         */
        const down = (e: KeyboardEvent) => {
            // If the key pressed is "k", or "ctrl", or "metaKey", change the state of the search modal.
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                // Prevent the event by default.
                e.preventDefault();
                // Change the state of the search modal.
                setOpen((open) => !open);
            }
        };

        // Activate the key pressed event.
        document.addEventListener('keydown', down);

        // Clean the key pressed event, once the component is destroyed.
        return () => document.removeEventListener('keydown', down);
    }, []);

    /**
     * Model for redirect function properties.
     */
    interface RedirectProps {
        id: string;
        type: SearchType;
    }

    /**
     * Redirect user feature.
     *
     * @param { RedirectProps } param0 - Redirect function props.
     *
     * @returns { void } User redirect.
     */
    const onRedirect = ({ id, type }: RedirectProps): void => {
        // If the key pressed is "k", or "ctrl", or "metaKey", change the state of the search modal.
        setOpen(false);

        // If the search type is member, redirect the user to conversations with that member.
        if (type === 'member')
            return router.push(
                `/servers/${params?.serverId}/conversations/${id}`
            );

        // If the search type is a channel, redirect the user to the specified channel.
        if (type === 'channel')
            return router.push(`/servers/${params?.serverId}/channels/${id}`);
    };

    return (
        <>
            <button
                className="
                    group px-2 py-2 rounded-md flex items-center gap-x-2
                    w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50
                    transition
                "
                onClick={() => setOpen(true)}
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
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search all channels and members" />
                <CommandList>
                    <CommandEmpty> No Results Found </CommandEmpty>
                    {data.map(({ label, type, data }) => {
                        if (!data?.length) return null;

                        return (
                            <CommandGroup key={label} heading={label}>
                                {data?.map(({ id, icon, name }) => (
                                    <CommandItem
                                        key={id}
                                        onSelect={() =>
                                            onRedirect({ id, type })
                                        }
                                    >
                                        {icon}
                                        <span>{name}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        );
                    })}
                </CommandList>
            </CommandDialog>
        </>
    );
};
