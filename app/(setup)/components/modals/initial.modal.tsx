'use client';

import type { FC, JSX } from 'react';

import { Dialog, ServerModalHeader } from '@/components';
import { useMounted } from '@/hooks';
import { ModalTypeKeys } from '@/models';

/**
 * Initial server form modal.
 *
 * @returns { JSX.Element | null } Initial server form modal.
 */
export const InitialModal: FC = (): JSX.Element | null => {
    useMounted({ valueToReturn: null });

    return (
        <Dialog open>
            <ServerModalHeader
                isInitialModal={true}
                modalType={ModalTypeKeys.CREATE_SERVER}
            />
        </Dialog>
    );
};
