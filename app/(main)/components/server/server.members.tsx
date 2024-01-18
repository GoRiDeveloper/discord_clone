'use client';

import type { FC, JSX } from 'react';

import type { MemberWithProfile } from '@/models';
import type { ServerWithMembersWithProfiles } from '@/types';
import { ServerInfoProps } from '../../models';
import { ServerMember, ServerSection } from './';

/**
 * Server members component.
 *
 * @param { ServerIdParams } param0 - Server id params.
 *
 * @returns { Promise<JSX.Element> } Server members component.
 */
export const ServerMembers: FC<ServerInfoProps> = ({
    members,
    server,
    userRole,
}: ServerInfoProps): JSX.Element => {
    return (
        <>
            {!!members?.length && (
                <div className="mb-2">
                    <ServerSection
                        sectionType="members"
                        role={userRole}
                        label="Members"
                        server={server as ServerWithMembersWithProfiles}
                    />
                    <div className="space-y-[2px]">
                        {members.map((member) => (
                            <ServerMember
                                key={member.id}
                                member={member as MemberWithProfile}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};
