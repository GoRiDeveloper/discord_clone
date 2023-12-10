'use client';

import { useEffect, useState, type FC, type JSX } from 'react';

import { CreateChannelModal } from '@/components/modals/create-channel.modal';
import { CreateServerModal } from '@/components/modals/create-server.modal';
import { DeleteChannelModal } from '@/components/modals/delete-channel.modal';
import { DeleteServerModal } from '@/components/modals/delete-server.modal';
import { EditChannelModal } from '@/components/modals/edit-channel.modal';
import { MessageFileModal } from '@/components/modals/message-file.modal';
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
            <CreateChannelModal />
            <DeleteChannelModal />
            <DeleteServerModal />
            <CreateServerModal />
            <MessageFileModal />
            <EditChannelModal />
            <EditServerModal />
            <MembersModal />
            <InviteModal />
        </>
    );
};
