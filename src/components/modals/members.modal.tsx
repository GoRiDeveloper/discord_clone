'use client';

import { MemberRole } from '@prisma/client';
import axios from 'axios';
import {
    Check,
    Gavel,
    Loader2,
    MoreVertical,
    Shield,
    ShieldAlert,
    ShieldCheck,
    ShieldQuestion,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { useState, type FC, type JSX } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    ScrollArea,
    UserAvatar,
} from '@/components';
import { useModal } from '@/hooks';
import { ServerWithMembersWithProfiles } from '@/types';

/**
 * Role icons.
 */
const roleIconMap = {
    GUEST: null,
    MODERATOR: <ShieldCheck className="2-4 h-4 text-indigo-500" />,
    ADMIN: <ShieldAlert className="w-4 h-4 text-rose-500" />,
};

/**
 * Members modal.
 *
 * @returns { JSX.Element | null } Members modal.
 */
export const MembersModal: FC = (): JSX.Element | null => {
    // Status for updating a user property.
    const [loadingId, setLoadingId] = useState('');

    // Modal store functionalities.
    const { isOpen, type, data, onOpen, onClose } = useModal();

    /**
     * App router.
     */
    const router = useRouter();

    /**
     * Check if the invitation modal is open.
     */
    const isModalOpen = isOpen && type === 'members';

    /**
     * Server information.
     */
    const { server } = data as { server: ServerWithMembersWithProfiles };

    const onKick = async (memberId: string): Promise<void> => {
        try {
            // Change of status to the user whose is being changed.
            setLoadingId(memberId);

            /**
             * Url to cupdate a user's on the server.
             */
            const url = qs.stringify({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server?.id,
                },
            });

            // Server with user deleted.
            const { data } = await axios.delete(url);

            // Refresh current page.
            router.refresh();

            // Open updated member modal.
            onOpen('members', { server: data });
        } catch (error) {
            console.error(error);
        } finally {
            // User reset state updating.
            setLoadingId('');
        }
    };

    /**
     * Function to change the user's role on the server.
     *
     * @param { string } memberId - Member id on server.
     * @param { MemberRole } role - Member role on server.
     */
    const onRoleChange = async (
        memberId: string,
        role: MemberRole
    ): Promise<void> => {
        try {
            // Change of status to the user whose role is being changed.
            setLoadingId(memberId);

            /**
             * Url to change a user's role on the server.
             */
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server?.id,
                    memberId,
                },
            });

            // Server with user role change.
            const { data } = await axios.patch(url, { role });

            // Refresh current page.
            router.refresh();

            // Open updated members modal.
            onOpen('members', { server: data });
        } catch (error) {
            console.error(error);
        } finally {
            // User reset state updating.
            setLoadingId('');
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        {' '}
                        Manage Members{' '}
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        {server?.members?.length} Members
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="mt-8 max-h-[420px] pr-6">
                    {server?.members?.map((member) => (
                        <div
                            key={member.id}
                            className="flex items-center gap-x-2 mb-6"
                        >
                            <UserAvatar src={member.profile.imageUrl} />
                            <div className="flex flex-col gap-y-1">
                                <div className="text-xs font-semibold flex items-center gap-x-1">
                                    {member.profile.name}
                                    {roleIconMap[member.role]}
                                </div>
                                <p className="text-xs text-zinc-500">
                                    {member.profile.email}
                                </p>
                            </div>
                            {server.profileId !== member.profileId &&
                                loadingId !== member.id && (
                                    <div className="ml-auto">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <MoreVertical className="h-4 w-4 text-zinc-5000"></MoreVertical>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent side="left">
                                                <DropdownMenuSub>
                                                    <DropdownMenuSubTrigger className="flex items-center">
                                                        <ShieldQuestion className="w-4 h-4 mr-2" />
                                                        <span>role</span>
                                                    </DropdownMenuSubTrigger>
                                                    <DropdownMenuPortal>
                                                        <DropdownMenuSubContent>
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    onRoleChange(
                                                                        member.id,
                                                                        'GUEST'
                                                                    )
                                                                }
                                                            >
                                                                <Shield className="w-4 h-4 mr-2" />
                                                                Guest
                                                                {member.role ===
                                                                    'GUEST' && (
                                                                    <Check className="w-4 h-4 ml-auto" />
                                                                )}
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    onRoleChange(
                                                                        member.id,
                                                                        'MODERATOR'
                                                                    )
                                                                }
                                                            >
                                                                <ShieldCheck className="w-4 h-4 mr-2" />
                                                                Moderator
                                                                {member.role ===
                                                                    'MODERATOR' && (
                                                                    <Check className="w-4 h-4 ml-auto" />
                                                                )}
                                                            </DropdownMenuItem>
                                                        </DropdownMenuSubContent>
                                                    </DropdownMenuPortal>
                                                </DropdownMenuSub>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        onKick(member.id)
                                                    }
                                                >
                                                    <Gavel className="w-4 h-4 mr-2" />
                                                    Kick
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                )}
                            {loadingId === member.id && (
                                <Loader2 className="animate-spin text-zinc-500 ml-auto w-4 h-4" />
                            )}
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
