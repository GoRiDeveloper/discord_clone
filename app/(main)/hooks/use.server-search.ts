'use client';

import { useEffect } from 'react';

import { ServerSearchProps } from '../models';

/**
 * Hook to manipulate the functionalities to close the search modal.
 *
 * @param { ServerSearchProps } param0 - Use server search props.
 */
export const useServerSearch = ({ setOpen }: ServerSearchProps) => {
    useEffect(() => {
        /**
         * Function to check which key the user presses and activate the search mode.
         *
         * @param { KeyboardEvent } e - Key pressed event.
         */
        const down = (e: KeyboardEvent) => {
            // If the key pressed is "k", or "ctrl", or "metaKey", change the state of the search modal.
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                // Prevent the event by default.
                e.preventDefault();
                // Change the state of the search modal.
                setOpen();
            }
        };

        // Activate the key pressed event.
        document.addEventListener('keydown', down);

        // Clean the key pressed event, once the component is destroyed.
        return () => document.removeEventListener('keydown', down);
    }, [setOpen]);
};
