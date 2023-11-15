'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';
import type { FC, JSX } from 'react';

/**
 * App theme provider component.
 *
 * @param { ThemeProviderProps } param0 - App theme provider component props.
 *
 * @returns { JSX.Element } App theme provider component.
 */
export const ThemeProvider: FC<ThemeProviderProps> = ({
    children,
    ...props
}: ThemeProviderProps): JSX.Element => {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};
