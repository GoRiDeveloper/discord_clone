import type { FC, JSX } from 'react';

import { DialogDescription } from '@/components';
import { ModalTypeKeys, type ModalTypeProps } from '@/models';

/**
 * Model for delete description props.
 */
interface DeleteDescriptionProps extends ModalTypeProps {
    title?: string;
}

/**
 * Delete description component.
 *
 * @param { DeleteDescriptionProps } param0 - Delete description props..
 *
 * @returns { JSX.Element } Delete description component.
 */
export const DeleteDescription: FC<DeleteDescriptionProps> = ({
    title,
    modalType,
}: DeleteDescriptionProps): JSX.Element => {
    return (
        <DialogDescription className="text-center text-zinc-500">
            Are you sure you want do this?
            <br />
            {!(modalType === ModalTypeKeys.DELETE_MESSAGE) ? (
                <span className="font-semibold text-indigo-500">
                    {modalType === ModalTypeKeys.DELETE_CHANNEL && '#'}
                    {title} will be permanently deleted.
                </span>
            ) : (
                'The message will be permanently deletes.'
            )}
        </DialogDescription>
    );
};
