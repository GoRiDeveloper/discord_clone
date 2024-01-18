import type { FC, JSX } from 'react';

import { ActionTooltip } from '@/components';
import { ChangeServerButton } from '../server';

/**
 * Model for a navigation element component props.
 */
interface NavigationItemProps {
    id: string;
    imageUrl: string;
    name: string;
}

/**
 * Navigation element component..
 *
 * @param { NavigationItemProps } param0 - Navigation element component props.
 *
 * @returns { JSX.Element } Navigation element component.
 */
export const NavigationItem: FC<NavigationItemProps> = ({
    id,
    name,
    imageUrl,
}: NavigationItemProps): JSX.Element => {
    return (
        <div className="mb-4">
            <ActionTooltip side="right" align="center" label={name}>
                <ChangeServerButton serverId={id} imgUrl={imageUrl} />
            </ActionTooltip>
        </div>
    );
};
