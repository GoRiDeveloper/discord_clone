import type { FC, JSX, PropsWithChildren } from 'react';

import { SocketContextProvider } from '@/context';

/**
 * Socket Provider.
 *
 * @param { PropsWithChildren } param0 - Default props with children of a component in React.
 *
 * @returns { JSX.Element } Socket Provider.
 */
export const SocketProvider: FC<PropsWithChildren> = ({
    children,
}: PropsWithChildren): JSX.Element => {
    return <SocketContextProvider>{children}</SocketContextProvider>;
};
