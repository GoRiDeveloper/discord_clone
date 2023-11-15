import type { FC, PropsWithChildren, JSX } from 'react';
import { NavigationSidebar } from '@/components';

/**
 * Main design of the app.
 *
 * @param { PropsWithChildren } param0 - Default model of the properties of a component in React.
 *
 * @returns { JSX.Element } Main design of the app.
 */
const MainLayout: FC<PropsWithChildren> = async ({
    children,
}: PropsWithChildren): Promise<JSX.Element> => {
    return (
        <div className="h-full">
            <div className="h-full">
                <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
                    <NavigationSidebar />
                </div>
                <main className="md:pl-[72px] h-full">{children}</main>
            </div>
        </div>
    );
};

export default MainLayout;
