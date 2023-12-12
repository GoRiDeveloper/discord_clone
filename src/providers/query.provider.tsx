'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type FC, type JSX, type PropsWithChildren } from 'react';

/**
 * React query provider.
 *
 * @param { PropsWithChildren } param0 - Default props react with children.
 *
 * @returns { JSX.Element } React query provider.
 */
export const QueryProvider: FC<PropsWithChildren> = ({
    children,
}: PropsWithChildren): JSX.Element => {
    // Query client state.
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};
