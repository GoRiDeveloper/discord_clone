import { useContext } from 'react';

import { SocketContext, type ISocketContext } from '@/context';

/**
 * Hook to use sockets context.
 *
 * @returns { IScokectContext } Socket context.
 */
export const useSocketContext = (): ISocketContext => useContext(SocketContext);
