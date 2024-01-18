'use client';

import {
    createContext,
    useEffect,
    useMemo,
    useState,
    type FC,
    type JSX,
    type PropsWithChildren,
} from 'react';
import { io as ClientIO } from 'socket.io-client';

import { useToggle } from '@/hooks';
import { SocketApiRoutes } from '@/models';

/**
 * Model for sockets context.
 */
export interface ISocketContext {
    socket: any | null;
    isConnected: Boolean;
}

/**
 * Socket context creation.
 */
export const SocketContext = createContext<ISocketContext>({
    socket: null,
    isConnected: false,
});

/**
 * Sockets context provider.
 *
 * @param { PropsWithChildren } param0 - Default props with children of a component in React.
 *
 * @returns { JSX.Element } Sockets context provider.
 */
export const SocketContextProvider: FC<PropsWithChildren> = ({
    children,
}: PropsWithChildren): JSX.Element => {
    // State to store and modify the socket.
    const [socket, setSocket] = useState(null);

    // Socket connection status from the useToggle hook.
    const { status: isConnected, toggleStatus: setIsConnected } = useToggle();

    useEffect(() => {
        /**
         * Function to control socket connection status.
         *
         * @returns { void } Functionality to control socket connection status.
         */
        const handleIsConnected = (): void => setIsConnected();

        /**
         * Socket instance.
         */
        const SocketInstance = new (ClientIO as any)(
            process.env.NEXT_PUBLIC_SITE_URL!,
            {
                path: SocketApiRoutes.IO,
                addTrailingSlash: false,
                withCredentials: true,
            }
        );

        SocketInstance.on('connect_error', (err: any) => {
            console.log({ err });
            console.error('Client side error due to: ' + err.message);
        });

        // If the socket is connected, we change the connection state.
        SocketInstance.on('connect', handleIsConnected);

        // If the socket is disconnected, we change the connection state.
        SocketInstance.on('disconnect', handleIsConnected);

        // Add the socket instance to the socket state.
        setSocket(SocketInstance);

        return () => {
            // When the component is destroyed, we disconnect the socket.
            SocketInstance.disconnect();
        };
    }, [setIsConnected]);

    /**
     * Memorizing socket states.
     */
    const value = useMemo(
        () => ({
            socket,
            isConnected,
        }),
        [socket, isConnected]
    );

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};
