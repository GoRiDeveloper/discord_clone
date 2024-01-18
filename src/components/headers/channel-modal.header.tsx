import type { FC, JSX } from 'react';

import {
    ChannelForm,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components';
import { ChannelProps, ModalTypeKeys } from '@/models';

/**
 * Channel modal header component.
 *
 * @param { ChannelProps } param0 - Channel modal header props.
 *
 * @returns { JSX.Element } Channel modal header component.
 */
export const ChannelModalHeader: FC<ChannelProps> = ({
    modalType,
}: ChannelProps): JSX.Element => {
    const modalTitle =
        modalType === ModalTypeKeys.CREATE_CHANNEL ? 'Create' : 'Edit';

    return (
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
            <DialogHeader className="pt-8 px-6">
                <DialogTitle className="text-2xl text-center font-bold">
                    {' '}
                    {modalTitle} channel{' '}
                </DialogTitle>
            </DialogHeader>
            <ChannelForm modalType={modalType} />
        </DialogContent>
    );
};
