import { GlobalProviders } from '@/providers';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import type { FC, JSX, PropsWithChildren } from 'react';
import './globals.css';

/**
 * Base font app.
 */
const font = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Team Chat App',
    description: 'Generated by create next app',
};

/**
 * Main app component.
 *
 * @param { PropsWithChildren } param0 -
 *
 * @returns { JSX.Element } Main app component.
 */
const RootLayout: FC<PropsWithChildren> = ({
    children,
}: PropsWithChildren): JSX.Element => {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={font.className}>
                    <GlobalProviders>{children}</GlobalProviders>
                </body>
            </html>
        </ClerkProvider>
    );
};

export default RootLayout;
