'use client';

import type { FC, JSX } from 'react';

import { Dialog, ServerModalHeader } from '@/components';
import { useHandleModal } from '@/hooks';
import { ModalTypeKeys } from '@/models';

/**
 * Edit server form modal.
 *
 * @returns { JSX.Element | null } Edit server form modal.
 */
export const EditServerModal: FC = (): JSX.Element => {
    const { isModalOpen, handleClose } = useHandleModal({
        modalType: ModalTypeKeys.EDIT_SERVER,
    });

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <ServerModalHeader modalType={ModalTypeKeys.EDIT_SERVER} />
        </Dialog>
    );
};
