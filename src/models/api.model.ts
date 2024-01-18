/**
 * Api routes in the app.
 */
export const ApiRoutes = {
    livekitApi: (id: string, name: string): string =>
        `/api/livekit?room=${id}&username=${name}`,
    server: (serverId?: string) => `/api/servers/${serverId}`,
    channel: (channelId?: string) => `/api/channels/${channelId}`,
    member: (memberId: string) => `/api/members/${memberId}`,
    inviteCode: (serverId?: string) =>
        `${ApiRoutes.server(serverId)}/invite-code`,
    leaveServer: (serverId?: string) => `${ApiRoutes.server(serverId)}/leave`,
    servers: '/api/servers',
    channels: '/api/channels',
};
