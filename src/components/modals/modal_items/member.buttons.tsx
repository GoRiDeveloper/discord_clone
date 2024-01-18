import { MemberRole } from '@prisma/client';
import { Check, Shield, ShieldCheck, ShieldQuestion } from 'lucide-react';
import type { FC, JSX } from 'react';

import {
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    KickButton,
} from '@/components';
import { useRoleChangeOrKick } from '@/hooks';
import type { ModifyMemberButtonsProps } from '@/models';

/**
 * Role buttons component.
 *
 * @param { RoleButtonsProps } param0 - Role buttons props.
 *
 * @returns { JSX.Element } Role buttons component.
 */
export const MemberButtons: FC<ModifyMemberButtonsProps> = ({
    id,
    role,
    setLoadingId,
}: ModifyMemberButtonsProps): JSX.Element => {
    const { onRoleChangeOrKick } = useRoleChangeOrKick({
        setLoadingId,
    });

    return (
        <>
            <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center">
                    <ShieldQuestion className="w-4 h-4 mr-2" />
                    <span>role</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem
                            onClick={() =>
                                onRoleChangeOrKick(id, MemberRole.GUEST)
                            }
                        >
                            <Shield className="w-4 h-4 mr-2" />
                            Guest
                            {role === MemberRole.GUEST && (
                                <Check className="w-4 h-4 ml-auto" />
                            )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() =>
                                onRoleChangeOrKick(id, MemberRole.MODERATOR)
                            }
                        >
                            <ShieldCheck className="w-4 h-4 mr-2" />
                            Moderator
                            {role === MemberRole.MODERATOR && (
                                <Check className="w-4 h-4 ml-auto" />
                            )}
                        </DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>
            <KickButton id={id} setLoadingId={setLoadingId} />
        </>
    );
};
