import type { FC, JSX } from 'react';
import { Gavel } from 'lucide-react';

import { DropdownMenuSeparator, DropdownMenuItem } from '@/components';
import { useRoleChangeOrKick } from '@/hooks';
import { MemberButtonProps } from '@/models';

/**
 * Kick button component.
 *
 * @param { MemberButtonProps } param0 - Kick button props.
 *
 * @returns { JSX.Element } Kick button component.
 */
export const KickButton: FC<MemberButtonProps> = ({
    id,
    setLoadingId,
}: MemberButtonProps): JSX.Element => {
    const { onRoleChangeOrKick } = useRoleChangeOrKick({
        kick: true,
        setLoadingId,
    });

    return (
        <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onRoleChangeOrKick(id)}>
                <Gavel className="w-4 h-4 mr-2" />
                Kick
            </DropdownMenuItem>
        </>
    );
};
