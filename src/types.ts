import type { Server as NetServer, Socket } from 'net';
import type { NextApiResponse } from 'next';
import type { Server as SocketIOServer } from 'socket.io';
import type { Server } from '@prisma/client';

import type { MemberWithProfile } from '@/models';

export type ServerWithMembersWithProfiles = Server & {
    members: MemberWithProfile[];
};

export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: SocketIOServer;
        };
    };
};
