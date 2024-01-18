'use client';

import { useContext } from 'react';

import type { ISocketContext } from '@/context';
import { SocketContext } from '@/context/socket.context';

/**
 * Hook to use sockets context.
 *
 * @returns { IScokectContext } Socket context.
 */
export const useSocketContext = (): ISocketContext => useContext(SocketContext);
