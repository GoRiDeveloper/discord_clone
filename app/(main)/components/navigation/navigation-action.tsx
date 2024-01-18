'use client';

import { Plus } from 'lucide-react';
import type { FC, JSX } from 'react';

import { ActionTooltip } from '@/components';
import { useModal } from '@/hooks';
import { ModalType } from '@/models';

/**
 * Navigation action component to add a new server.
 *
 * @returns { JSX.Element } Navigation action component to add a new server.
 */
export const NavigationAction: FC = (): JSX.Element => {
    // Modal store functionalities.
    const { onOpen } = useModal();

    return (
        <div>
            <ActionTooltip side="right" align="center" label="Add a server">
                <button
                    className="group flex items-center"
                    onClick={() => onOpen(ModalType.CREATE_SERVER)}
                >
                    <div
                        className="
                            flex mx-3 h-[48px] w-[48px] rounded-[24px]
                            group-hover:rounded-[16px] transition-all
                            overflow-hidden items-center justify-center
                            bg-background dark:bg-neutral-700
                            group-hover:bg-emerald-500
                        "
                    >
                        <Plus
                            className="
                                group-hover:text-white transition
                                text-emerald-500
                            "
                            size={25}
                        />
                    </div>
                </button>
            </ActionTooltip>
        </div>
    );
};
