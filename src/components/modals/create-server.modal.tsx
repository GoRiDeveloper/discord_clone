'use client';

import type { FC, JSX } from 'react';

import { Dialog, ServerModalHeader } from '@/components';
import { useHandleModal } from '@/hooks';
import { ModalTypeKeys } from '@/models';

/**
 * Create server form modal.
 *
 * @returns { JSX.Element | null } Create server form modal.
 */
export const CreateServerModal: FC = (): JSX.Element | null => {
    const { isModalOpen, handleClose } = useHandleModal({
        modalType: ModalTypeKeys.CREATE_SERVER,
    });

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <ServerModalHeader modalType={ModalTypeKeys.CREATE_SERVER} />
        </Dialog>
    );
};
