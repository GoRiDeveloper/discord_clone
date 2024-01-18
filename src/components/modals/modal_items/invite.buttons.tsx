import { Check, Copy, RefreshCw } from 'lucide-react';
import type { FC, JSX } from 'react';

import { Button, Input } from '@/components';
import { useCopyCode, useRegenerateInviteCode } from '@/hooks';

/**
 * Invite buttons component.
 *
 * @returns { JSX.Element } Invite buttons component.
 */
export const InviteButtons: FC = (): JSX.Element => {
    const { isLoading, onRegenerate } = useRegenerateInviteCode();
    const { inviteUrl, copied, onCopy } = useCopyCode();

    return (
        <>
            <div className="flex items-center mt-2 gap-x-2">
                <Input
                    className="
                        bg-zinc-300/50 focus-visible:ring-0
                        text-black focus-visible:ring-offset-0
                        border-0
                    "
                    disabled={isLoading}
                    value={inviteUrl}
                    readOnly
                />
                <Button size="icon" disabled={isLoading} onClick={onCopy}>
                    {copied ? <Check /> : <Copy className="w-4 h-4" />}
                </Button>
            </div>
            <Button
                variant="link"
                size="sm"
                className="text-xs text-zinc-500 mt-4"
                disabled={isLoading}
                onClick={onRegenerate}
            >
                Generate a new link
                <RefreshCw className="w-4 h-4 ml-2" />
            </Button>
        </>
    );
};
