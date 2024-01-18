import { Member, Profile } from '@prisma/client';

/**
 * Model for member with profile.
 */
export type MemberWithProfile = Member & {
    profile: Profile;
};
