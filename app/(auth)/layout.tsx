import type { FC, JSX, PropsWithChildren } from 'react';

/**
 * Layout of the authentication pages.
 *
 * @param { PropsWithChildren } param0 - Default model of the properties of a component in React.
 *
 * @returns { JSX.Element } Layout of the authentication pages.
 */
const AuthLayout: FC<PropsWithChildren> = ({
    children,
}: PropsWithChildren): JSX.Element => {
    return (
        <div className="h-full flex items-center justify-center">
            {children}
        </div>
    );
};

export default AuthLayout;
