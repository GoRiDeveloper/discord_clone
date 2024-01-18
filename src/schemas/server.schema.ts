import z from 'zod';

import { AppErrors } from '@/models';

/**
 * Server initial modal form schema reference.
 */
export const serverSchema = z.object({
    name: z.string().min(1, { message: AppErrors.SERVER_NAME_REQUIRED }),
    imageUrl: z.string().min(1, { message: AppErrors.SERVER_IMG_REQUIRED }),
});
