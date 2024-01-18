/**
 * Socket keys.
 */
export const socketKeys = {
    CHAT_KEY: (id: string | string[]) => `chat:${id}`,
    MESSAGE_KEY: (id: string | string[]) => `chat:${id}:messages`,
    UPDATE_KEY: (id: string | string[]) => `chat:${id}:messages:update`,
};
