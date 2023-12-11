import { useState, type FC, type PropsWithChildren, type JSX } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
