import type { Dispatch, SetStateAction } from 'react';
import type { MemberRole } from '@prisma/client';

import type { MemberWithProfile } from '@/models';

/**
 * Model for member props.
 */
export interface MemberProps {
    member: MemberWithProfile;
}

/**
 * Model for loading props.
 */
export interface LoadingProps {
    setLoadingId: Dispatch<SetStateAction<string>>;
}

/**
 * Model for member id props.
 */
export type MemberIdProps = Pick<MemberWithProfile, 'id'>;

/**
 * Model for member button props.
 */
export type MemberButtonProps = MemberIdProps & LoadingProps;

/**
 * Model for modify member buttons props.
 */
export interface ModifyMemberButtonsProps extends MemberButtonProps {
    role: MemberRole;
}
