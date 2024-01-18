import type { FC, JSX } from 'react';
import { MoreVertical } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    MemberButtons,
} from '@/components';
import type { ModifyMemberButtonsProps } from '@/models';

/**
 * Member menu component.
 *
 * @param { ModifyMemberButtonsProps } param0 - Member menu props.
 *
 * @returns { JSX.Element } Member menu component.
 */
export const MemberMenu: FC<ModifyMemberButtonsProps> = ({
    id,
    role,
    setLoadingId,
}: ModifyMemberButtonsProps): JSX.Element => {
    return (
        <div className="ml-auto">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreVertical className="w-4 h-4 text-zinc-5000" />
                </DropdownMenuTrigger>
                <DropdownMenuContent side="left">
                    <MemberButtons
                        id={id}
                        role={role}
                        setLoadingId={setLoadingId}
                    />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
