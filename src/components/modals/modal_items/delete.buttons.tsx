import type { FC, JSX } from 'react';

import { DialogFooter, Button } from '@/components';

/**
 * Model for delete button props.
 */
interface DeleteButtonsProps {
    isLoading: boolean;
    handleClose: () => void;
    onDelete: () => Promise<void>;
}

/**
 * Delete buttons component.
 *
 * @param { DeleteButtonsProps } param0 - Delete button props.
 *
 * @returns { JSX.Element } Delete buttons component.
 */
export const DeleteButtons: FC<DeleteButtonsProps> = ({
    isLoading,
    handleClose,
    onDelete,
}: DeleteButtonsProps): JSX.Element => {
    return (
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
                    onClick={onDelete}
                >
                    Confirm
                </Button>
            </div>
        </DialogFooter>
    );
};
