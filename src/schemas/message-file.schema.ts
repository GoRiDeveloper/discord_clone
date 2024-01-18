import z from 'zod';

import { AppErrors } from '@/models';

/**
 * Message file modal form schema reference.
 */
export const messageFileSchema = z.object({
    fileUrl: z.string().min(1, { message: AppErrors.ATTACHMENT_REQUIRED }),
});
