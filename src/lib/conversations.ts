import { db } from '@/lib';

/**
 * Function to find or generate a conversation in the database.
 *
 * @param { string } memberOneId - Member one ID.
 * @param { string } memberTwoId - Member two ID.
 *
 * @returns Conversation found or created in the database.
 */
export const getOrCreateConversation = async (
    memberOneId: string,
    memberTwoId: string
) => {
    let conversation =
        (await findConversation(memberOneId, memberTwoId)) ||
        (await findConversation(memberTwoId, memberOneId));

    if (!conversation) {
        conversation = await createdNewConversation(memberOneId, memberTwoId);
    }

    return conversation;
};

/**
 * Function to find a conversation if it exists.
 *
 * @param { string } memberOneId - Member one ID.
 * @param { string } memberTwoId - Member two ID.
 *
 * @returns Conversation found in the database if it exists.
 */
const findConversation = async (memberOneId: string, memberTwoId: string) => {
    try {
        // Search for the conversation if it exists.
        return await db.conversation.findFirst({
            where: {
                AND: [
                    { memberOneId: memberOneId },
                    { memberTwoId: memberTwoId },
                ],
            },
            include: {
                memberOne: {
                    include: {
                        profile: true,
                    },
                },
                memberTwo: {
                    include: {
                        profile: true,
                    },
                },
            },
        });
    } catch (error) {
        return null;
    }
};

/**
 * Function to generate a new conversation in the database.
 *
 * @param { string } memberOneId - Member one ID.
 * @param { string } memberTwoId - Member two ID.
 *
 * @returns Conversation generated on success.
 */
const createdNewConversation = async (
    memberOneId: string,
    memberTwoId: string
) => {
    try {
        // Create a conversation in the database.
        return await db.conversation.create({
            data: {
                memberOneId,
                memberTwoId,
            },
            include: {
                memberOne: {
                    include: {
                        profile: true,
                    },
                },
                memberTwo: {
                    include: {
                        profile: true,
                    },
                },
            },
        });
    } catch (error) {
        return null;
    }
};
