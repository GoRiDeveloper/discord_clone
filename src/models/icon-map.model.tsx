import { MemberRole } from '@prisma/client';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

/**
 * Role icons.
 */
export const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: (
        <ShieldCheck className="w-4 h-4 ml-2 text-indigo-500" />
    ),
    [MemberRole.ADMIN]: <ShieldAlert className="w-4 h-4 ml-2 text-rose-500" />,
};
