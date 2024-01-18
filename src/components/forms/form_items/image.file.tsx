import type { FC, JSX } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';

import type { FileProps } from '@/models';

/**
 * Image file component.
 *
 * @param { FileProps } param0 - Image file props.
 *
 * @returns { JSX.Element } Image file component.
 */
export const ImageFile: FC<FileProps> = ({
    value,
    onChange,
}: FileProps): JSX.Element => {
    return (
        <div className="relative h-20 w-20">
            <Image
                fill
                src={value}
                sizes="80px"
                alt="upload"
                className="rounded-full"
            />
            <button
                className="
                    bg-rose-500 text-white p-1 rounded-full absolute top-0
                    right-0 shadow-sm
                "
                onClick={() => onChange('')}
                type="button"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};
