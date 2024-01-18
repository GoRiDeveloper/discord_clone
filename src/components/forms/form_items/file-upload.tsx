import type { FC, JSX } from 'react';

import { PdfFile, ImageFile } from '@/components';
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
    if (value && fileType !== 'pdf')
        return <ImageFile value={value} onChange={onChange} />;

    // Check if the file type is a pdf.
    if (value && fileType === 'pdf')
        return <PdfFile value={value} onChange={onChange} />;

    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].fileUrl);
            }}
            onUploadError={(error: Error) => {
                console.error({ error });
            }}
        />
    );
};
