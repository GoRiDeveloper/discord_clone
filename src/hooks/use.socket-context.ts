import { useContext } from 'react';

import { SocketContext } from '@/context/socket.context';
import type { ISocketContext } from '@/context';

/**
 * Hook to use sockets context.
 *
 * @returns { IScokectContext } Socket context.
 */
export const useSocketContext = (): ISocketContext => useContext(SocketContext);
