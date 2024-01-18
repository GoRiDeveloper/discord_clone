import z from 'zod';
import { ChannelType } from '@prisma/client';

import { APP_CHANNELS, AppErrors } from '@/models';

/**
 * Create channel modal form schema reference.
 */
export const channelSchema = z.object({
    name: z
        .string()
        .min(1, { message: AppErrors.CHANNEL_NAME_REQUIRED })
        .refine((name) => name !== APP_CHANNELS.GENERAL, {
            message: AppErrors.CHANNEL_NOT_GENERAL,
        }),
    type: z.nativeEnum(ChannelType),
});
