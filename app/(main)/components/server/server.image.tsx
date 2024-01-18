import Image from 'next/image';
import type { FC, JSX } from 'react';

import { cn } from '@/lib';
import { ChatType } from '../../models';

/**
 * Model for server image props.
 */
interface ServerImageProps {
    paramsServerId?: string | string[];
    serverId: string;
    imgUrl: string;
}

/**
 * Server image component.
 *
 * @param { ServerImageProps } param0 - Server image props.
 *
 * @returns { JSX.Element } Server image component.
 */
export const ServerImage: FC<ServerImageProps> = ({
    paramsServerId,
    serverId,
    imgUrl,
}: ServerImageProps): JSX.Element => {
    return (
        <div
            className={cn(
                'relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden',
                paramsServerId === serverId &&
                    'bg-primary/10 text-primary rounded-[16px]'
            )}
        >
            <Image
                priority
                width={48}
                height={48}
                src={imgUrl}
                alt={ChatType.channel}
            />
        </div>
    );
};
