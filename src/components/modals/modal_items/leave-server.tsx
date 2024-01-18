import type { FC, JSX } from 'react';

import { Button, DialogDescription, DialogFooter } from '@/components';
import { useHandleModal, useLeaveServer } from '@/hooks';
import { ModalTypeKeys } from '@/models';

/**
 * Leave server.
 *
 * @returns { JSX.Element } Leave server.
 */
export const LeaveServer: FC = (): JSX.Element => {
    const { serverName, isLoading, onExit } = useLeaveServer();

    const { handleClose } = useHandleModal({
        modalType: ModalTypeKeys.LEAVE_SERVER,
    });

    return (
        <>
            <DialogDescription className="text-center text-zinc-500">
                Are you sure you want to leave
                <span className="font-semibold text-indigo-500">
                    {serverName}
                </span>
                ?
            </DialogDescription>
            <DialogFooter className="bg-gray-100 px-6 py-4">
                <div className="flex items-center justify-between w-full">
                    <Button
                        variant="ghost"
                        disabled={isLoading}
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        disabled={isLoading}
                        onClick={onExit}
                    >
                        Confirm
                    </Button>
                </div>
            </DialogFooter>
        </>
    );
};
