import { Message, Member, Profile } from '@prisma/client';

/**
 * Model for member with profile.
 */
export type MemberWithProfile = Member & {
    profile: Profile;
};

/**
 * Model for message with member with profile props.
 */
export type MessageWithMemberWithProfile = Message & {
    member: MemberWithProfile;
};
