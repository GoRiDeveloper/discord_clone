import { Message } from '@prisma/client';

import { MemberWithProfile } from '@/models';

/**
 * Model for message with member with profile props.
 */
export type MessageWithMemberWithProfile = Message & {
    member: MemberWithProfile;
};
