'use client';

import { useState, type FC, type JSX } from 'react';
import { Loader2 } from 'lucide-react';

import { UserAvatar, MemberMenu } from '@/components';
import { useModal } from '@/hooks';
import { roleIconMap, type MemberProps } from '@/models';
import type { ServerWithMembersWithProfiles } from '@/types';

/**
 * Member component.
 *
 * @param { MemberProps } param0 Member props.
 *
 * @returns { JSX.Element } Member component.
 */
export const Member: FC<MemberProps> = ({
    member,
}: MemberProps): JSX.Element => {
    // Status for updating a user property.
    const [loadingId, setLoadingId] = useState<string>('');

    // Modal store functionalities.
    const { data } = useModal();

    // Server information.
    const { server } = data as { server: ServerWithMembersWithProfiles };

    return (
        <div className="flex items-center gap-x-2 mb-6">
            <UserAvatar src={member.profile.imageUrl} />
            <div className="flex flex-col gap-y-1">
                <div className="text-xs font-semibold flex items-center gap-x-1">
                    {member.profile.name}
                    {roleIconMap[member.role]}
                </div>
                <p className="text-xs text-zinc-500">{member.profile.email}</p>
            </div>
            {server.profileId !== member.profileId &&
                loadingId !== member.id && (
                    <MemberMenu
                        id={member.id}
                        role={member.role}
                        setLoadingId={setLoadingId}
                    />
                )}
            {loadingId === member.id && (
                <Loader2 className="animate-spin text-zinc-500 ml-auto w-4 h-4" />
            )}
        </div>
    );
};
