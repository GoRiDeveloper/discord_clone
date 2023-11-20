import type { FC, JSX } from 'react';

import { Avatar, AvatarImage } from '@/components';
import { cn } from '@/lib';

/**
 * Model for user avatar props.
 */
interface UserAvatarProps {
    src?: string;
    className?: string;
}

/**
 * Component for user avatar.
 *
 * @param { UserAvatarProps } param0 - User avatar props.
 *
 * @returns { JSX.Element } Component for user avatar.
 */
export const UserAvatar: FC<UserAvatarProps> = ({
    src,
    className,
}: UserAvatarProps): JSX.Element => {
    return (
        <Avatar className={cn('h-7 w-7 md:h-10 md:w-10', className)}>
            <AvatarImage src={src} />
        </Avatar>
    );
};
