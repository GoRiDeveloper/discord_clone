'use client';

import type { FC, JSX } from 'react';

import { cn } from '@/lib';
import { useChangeButton } from '../../hooks';
import { ServerImage } from './server.image';

/**
 * Model for change server button props.
 */
interface ChangeServerButtonProps {
    serverId: string;
    imgUrl: string;
}

/**
 * Change server button component.
 *
 * @param { ChangeServerButtonProps } param0 - Change server button props.
 *
 * @returns { JSX.Element } Change server button component.
 */
export const ChangeServerButton: FC<ChangeServerButtonProps> = ({
    serverId,
    imgUrl,
}: ChangeServerButtonProps): JSX.Element => {
    const { params, handleClick } = useChangeButton({ id: serverId });

    return (
        <button
            onClick={handleClick}
            className="group relative flex items-center"
        >
            <div
                className={cn(
                    'absolute left-0 bg-primary rounded-r-full transition-all w-[4px]',
                    params?.serverId !== serverId && 'group-hover:h-[20px]',
                    params?.serverId === serverId ? 'h-[36px]' : 'h-[8px]'
                )}
            />
            <ServerImage
                paramsServerId={params?.serverId}
                serverId={serverId}
                imgUrl={imgUrl}
            />
        </button>
    );
};
