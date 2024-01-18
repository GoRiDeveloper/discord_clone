import type { FC, JSX } from 'react';
import { FileIcon, X } from 'lucide-react';

import type { FileProps } from '@/models';

/**
 * Pdf file component.
 *
 * @param param0 - Pdf file props.
 *
 * @returns { JSX.Element } Pdf file component.
 */
export const PdfFile: FC<FileProps> = ({
    value,
    onChange,
}: FileProps): JSX.Element => {
    return (
        <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
            <FileIcon className="h-10 w-10 fill-indigo-200" />
            <a
                className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
                href={value}
            >
                {value}
            </a>
            <button
                className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
                type="button"
                onClick={() => onChange('')}
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};
