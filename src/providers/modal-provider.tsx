'use client';

import { useEffect, useState, type FC, type JSX } from 'react';

import { CreateServerModal } from '@/components/modals/create-server.modal';
import { EditServerModal } from '@/components/modals/edit-server.modal';
import { InviteModal } from '@/components/modals/invite.modal';
import { MembersModal } from '@/components/modals/members.modal';

/**
 * Provider for application modals.
 *
 * @returns { JSX.Element | null } Provider for application modals.
 */
export const ModalProvider: FC = (): JSX.Element | null => {
    // State for component.
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Change state for component.
        setIsMounted(true);
    }, []);

    // If the component is not mounted, we return null.
    if (!isMounted) return null;

    return (
        <>
            <CreateServerModal />
            <EditServerModal />
            <InviteModal />
            <MembersModal />
        </>
    );
};
