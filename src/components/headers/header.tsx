import type { FC, JSX, PropsWithChildren } from 'react';

import { DialogHeader, DialogTitle } from '@/components';

/**
 * Model for modal header props.
 */
interface ModalHeaderProps extends PropsWithChildren {
    title: string;
}

/**
 * Modal header component.
 *
 * @param { ModalHeaderProps } param0 - Modal header props.
 *
 * @returns { JSX.Element } Modal header component.
 */
export const ModalHeader: FC<ModalHeaderProps> = ({
    title,
    children,
}: ModalHeaderProps): JSX.Element => {
    return (
        <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
                {' '}
                {title}{' '}
            </DialogTitle>
            {children}
        </DialogHeader>
    );
};
