import z from 'zod';

/**
 * Chat form schema.
 */
export const chatItemSchema = z.object({
    content: z.string().min(1),
});
