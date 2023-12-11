import type { FC, JSX, PropsWithChildren } from 'react';

import { ModalProvider } from './modal-provider';
import { SocketProvider } from './socket.provider';
import { ThemeProvider } from './theme-provider';
import { QueryProvider } from './query.provider';

/**
 * Global application providers.
 *
 * @param { PropsWithChildren } param0 -
 *
 * @returns { JSX.Element } Global application providers.
 */
export const GlobalProviders: FC<PropsWithChildren> = ({
    children,
}: PropsWithChildren): JSX.Element => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="discord-theme"
        >
            <ModalProvider />
            <SocketProvider>
                <QueryProvider>{children}</QueryProvider>
            </SocketProvider>
        </ThemeProvider>
    );
};
