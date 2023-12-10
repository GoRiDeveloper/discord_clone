import '@uploadthing/react/styles.css';
import { X, FileIcon } from 'lucide-react';
import Image from 'next/image';
import type { FC, JSX } from 'react';

import { UploadDropzone } from '@/lib';

/**
 * Properties for the file upload component.
 */
interface FileUploadProps {
    onChange: (_url?: string) => void;
    value: string;
    endpoint: 'messageFile' | 'serverImage';
}

/**
 * File upload component.
 *
 * @param { FileUploadProps } param0 - Properties for the file upload component.
 *
 * @returns { JSX.Element } File upload component.
 */
export const FileUpload: FC<FileUploadProps> = ({
    onChange,
    value,
    endpoint,
}: FileUploadProps): JSX.Element => {
    /**
     * File extension.
     */
    const fileType = value?.split('.').pop();

    // Check if the file type is different from pdf.
    if (value && fileType !== 'pdf') {
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
    }

    // Check if the file type is a pdf.
    if (value && fileType === 'pdf') {
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
    }

    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].fileUrl);
            }}
            onUploadError={(error: Error) => {
                console.error(error);
            }}
        />
    );
};
