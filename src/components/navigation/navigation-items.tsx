import type { FC, JSX } from 'react';

import { NavigationItem, ScrollArea } from '@/components';
import { db } from '@/lib';

/**
 * Model for servers component for navigation bar.
 */
interface NavigationItemsProps {
    profileId: string;
}

/**
 * Servers component for navigation bar.
 *
 * @param { NavigationItemsProps } param0 - Servers component for navigation bar props.
 *
 * @returns { JSX.Element } Servers component for navigation bar.
 */
export const NavigationItems: FC<NavigationItemsProps> = async ({
    profileId,
}: NavigationItemsProps): Promise<JSX.Element> => {
    /**
     * Reference of the servers where the user is registered.
     */
    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId,
                },
            },
        },
    });

    return (
        <ScrollArea className="flex-1 w-full">
            {servers.map(({ id, name, imageUrl }) => (
                <NavigationItem
                    key={id}
                    id={id}
                    name={name}
                    imageUrl={imageUrl}
                />
            ))}
        </ScrollArea>
    );
};
