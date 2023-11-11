import type { FC, JSX, PropsWithChildren } from 'react';

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
    return <>{children}</>;
};
