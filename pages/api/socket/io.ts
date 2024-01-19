import { Server as NetServer } from 'http';
import { NextApiRequest } from 'next';
import { Server as ServerIO } from 'socket.io';

import { SocketApiRoutes } from '@/models';
import { NextApiResponseServerIo } from '@/types';

/**
 * Socket io config.
 */
export const config = {
    api: {
        bodyParser: false,
    },
};

/**
 * Socket io handler.
 *
 * @param { NextApiRequest } _req - Next api route request.
 * @param { NextApiResponse } res - Next api route response.
 */
const ioHandler = (
    _req: NextApiRequest,
    res: NextApiResponseServerIo
): void => {
    if (!res.socket.server.io) {
        const httpServer: NetServer = res.socket.server as any;
        const io = new ServerIO(httpServer, {
            path: SocketApiRoutes.IO,
            addTrailingSlash: false,
            cors: {
                origin: [
                    'https://g-iscord.vercel.app/',
                    'http://localhost:3000/',
                ],
                methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD'],
                credentials: true,
            },
            connectTimeout: 10000,
        });

        res.socket.server.io = io;
    }
    res.end();
};

export default ioHandler;
