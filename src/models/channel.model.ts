import { ChannelType } from '@prisma/client';
import z from 'zod';

import { ModalTypeKeys } from '@/models';
import { channelSchema } from '@/schemas';

/**
 * Typed for search types
 */
export enum ChannelsTypes {
    'channel' = 'channel',
    'member' = 'member',
}

/**
 * Server form type.
 */
export type ChannelFormType = z.infer<typeof channelSchema>;

/**
 * Model for channel props.
 */
export interface ChannelProps {
    modalType: ModalTypeKeys.EDIT_CHANNEL | ModalTypeKeys.CREATE_CHANNEL;
}

/**
 * Channel type form default values.
 */
export const ChannelDefaultValues = (
    channelType?: ChannelType
): ChannelFormType => ({
    name: '',
    type: channelType || ChannelType.TEXT,
});

/**
 * App channels.
 */
export enum APP_CHANNELS {
    GENERAL = 'general',
}
