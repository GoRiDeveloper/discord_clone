import type { FC, JSX, PropsWithChildren } from 'react';
import { ThemeProvider } from './theme-provider';

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
            {children}
        </ThemeProvider>
    );
};
