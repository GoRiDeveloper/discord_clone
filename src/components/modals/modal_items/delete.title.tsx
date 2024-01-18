import type { FC, JSX } from 'react';

import { DialogHeader, DialogTitle } from '@/components';
import { ModalTypeKeys, type ModalTypeProps } from '@/models';

/**
 * Delete title component.
 *
 * @param { ModalTypeProps } param0 - Modal types props.
 *
 * @returns { JSX.Element } Delete title component.
 */
export const DeleteTitle: FC<ModalTypeProps> = ({
    modalType,
}: ModalTypeProps): JSX.Element => {
    /**
     * Delete title.
     */
    let title: string;

    if (modalType === ModalTypeKeys.DELETE_CHANNEL) {
        title = 'Delete Channel';
    } else if (modalType === ModalTypeKeys.DELETE_MESSAGE) {
        title = 'Delete Message';
    } else {
        title = 'Delete Server';
    }

    return (
        <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
                {' '}
                {title}{' '}
            </DialogTitle>
        </DialogHeader>
    );
};
