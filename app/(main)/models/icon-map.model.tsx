import { ChannelType } from '@prisma/client';
import { Hash, Mic, Video } from 'lucide-react';

/**
 * Server channels icon map.
 */
export const channelIconMap = {
    [ChannelType.TEXT]: Hash,
    [ChannelType.AUDIO]: Mic,
    [ChannelType.VIDEO]: Video,
};

export const iconMap = {
    [ChannelType.TEXT]: <Hash className="w-4 h-4 mr-2" />,
    [ChannelType.AUDIO]: <Mic className="w-4 h-4 mr-2" />,
    [ChannelType.VIDEO]: <Video className="w-4 h-4 mr-2" />,
};
