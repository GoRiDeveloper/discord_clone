import z from 'zod';
import { Member } from '@prisma/client';

import type { MemberWithProfile } from '@/models';
import { chatItemSchema } from '../schemas';

/**
 * Chat type model.
 */
export enum ChatType {
    channel = 'channel',
    conversation = 'conversation',
}

/**
 * Model for chat form.
 */
export type ChatForm = z.infer<typeof chatItemSchema>;

/**
 * Chat default values.
 */
export const ChatDefaultValues: ChatForm = {
    content: '',
};

/**
 * Model for chat items props.
 */
export interface ChatItemProps {
    id: string;
    content: string;
    timestamp: string;
    socketUrl: string;
    deleted: boolean;
    isUpdated: boolean;
    fileUrl: string | null;
    currentMember: Member;
    member: MemberWithProfile;
    socketQuery: Record<string, string>;
}
