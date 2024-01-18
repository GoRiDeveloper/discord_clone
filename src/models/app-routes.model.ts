/**
 * App routes.
 */
export const AppRoutes = {
    HOME: '/',
    SERVER_ID: (id: string) => `/servers/${id}`,
    CHANNEL_ID: (serverId?: string | string[], channelId?: string) =>
        `/servers/${serverId}/channels/${channelId}`,
    MEMBER_ID: (serverId?: string | string[], memberId?: string) =>
        `/servers/${serverId}/conversations/${memberId}`,
    INVITE_URL: (origin: string, inviteCode?: string) =>
        `${origin}/invite/${inviteCode}`,
    ID: () => ``,
};
