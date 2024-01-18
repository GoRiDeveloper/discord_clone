import { Suspense, type FC, type JSX, type PropsWithChildren } from 'react';

import { ServerIdParams } from '@/models';
import ErrorBoundary from '@/components/error.boundary';
import {
    ServerSidebar,
    ServerErrorSection,
    ServerLoading,
} from '../../../components';
import { useServerId } from './hooks';

/**
 * Model for server id component props.
 */
type ServerIdLayoutProps = ServerIdParams & PropsWithChildren;

/**
 * Server id component.
 *
 * @param { ServerIdLayoutProps } param0 - Server id component props.
 *
 * @returns { Promise<JSX.Element> } Server id component.
 */
const ServerIdLayout: FC<ServerIdLayoutProps> = async ({
    children,
    params,
}: ServerIdLayoutProps): Promise<JSX.Element> => {
    useServerId({ serverId: params.serverId });

    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
                <ErrorBoundary fallback={<ServerErrorSection />}>
                    <Suspense fallback={<ServerLoading />}>
                        <ServerSidebar serverId={params.serverId} />
                    </Suspense>
                </ErrorBoundary>
            </div>
            <main className="h-full md:pl-60">{children}</main>
        </div>
    );
};

export default ServerIdLayout;
