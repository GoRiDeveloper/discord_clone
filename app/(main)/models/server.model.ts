import type { ReactNode } from 'react';
import type { Channel, Member, MemberRole, Server } from '@prisma/client';
import type { LucideIcon } from 'lucide-react';

import { ModalTypeProps, ChannelsTypes } from '@/models';
import type { ServerWithMembersWithProfiles } from '@/types';

/**
 * Model for use server actions hook props.
 */
export interface ServerChannelProps {
    channel: Channel;
    server: Server | ServerWithChannels | null;
}

/**
 * Model for server search props.
 */
export interface ServerSearchProps {
    setOpen: () => void;
}

/**
 * Model for server admin option props.
 */
export interface ServerHeaderOptionsProps extends ModalTypeProps {
    Icon: LucideIcon;
    server: Server;
    title: string;
    addClass?: string;
}

/**
 * Icons information interface.
 */
interface IconData {
    icon: LucideIcon | ReactNode;
    name: string;
    id: string;
}

/**
 * Search server information interface.
 */
export interface ServerSearchData {
    label: string;
    type: ChannelsTypes;
    data: IconData[] | undefined;
}

type ServerWithChannels = ServerWithMembersWithProfiles & {
    channels: Channel[];
};

/**
 * Model for server info.
 */
export interface ServerInfoProps {
    server: ServerWithChannels | null;
    userRole: MemberRole;
    channels?: Channel[];
    members?: Member[];
}
