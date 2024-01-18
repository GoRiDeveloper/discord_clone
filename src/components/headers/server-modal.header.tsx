import type { FC, JSX } from 'react';

import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    ServerForm,
} from '@/components';
import type { ServerFormProps } from '@/models';

/**
 * Server modal header component.
 *
 * @param { ServerFormProps } param0 - Server  modal header props.
 *
 * @returns { JSX.Element } Server modal header component.
 */
export const ServerModalHeader: FC<ServerFormProps> = ({
    isInitialModal,
    modalType,
}: ServerFormProps): JSX.Element => {
    return (
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
            <DialogHeader className="pt-8 px-6">
                <DialogTitle className="text-2xl text-center font-bold">
                    {' '}
                    Customize your{' '}
                </DialogTitle>
                <DialogDescription>
                    {' '}
                    Give your server a personality with a name and an image. You
                    can always change it later{' '}
                </DialogDescription>
            </DialogHeader>
            <ServerForm isInitialModal={isInitialModal} modalType={modalType} />
        </DialogContent>
    );
};
