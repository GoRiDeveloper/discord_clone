import z from 'zod';

import { messageFileSchema } from '@/schemas';

/**
 * Message file schema type.
 */
export type MessageFileType = z.infer<typeof messageFileSchema>;

/**
 * Message file form default values.
 */
export const DefaultMessageFile: MessageFileType = {
    fileUrl: '',
};

/**
 * Model for pdf file props.
 */
export interface FileProps {
    value: string;
    onChange: (_url?: string) => void;
}
