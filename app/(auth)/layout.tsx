import type { FC, JSX, PropsWithChildren } from 'react';

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
