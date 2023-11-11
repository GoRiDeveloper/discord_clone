import type { FC, JSX, PropsWithChildren } from 'react';

const AuthLayout: FC<PropsWithChildren> = ({
    children,
}: PropsWithChildren): JSX.Element => {
    return <>{children}</>;
};

export default AuthLayout;
