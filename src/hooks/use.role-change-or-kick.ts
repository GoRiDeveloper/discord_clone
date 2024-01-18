import qs from 'query-string';
import { useRouter } from 'next/navigation';
import { MemberRole } from '@prisma/client';

import { Axios } from '@/lib';
import { ApiRoutes, ModalType, type LoadingProps } from '@/models';
import { useModal } from '@/hooks';

/**
 * Model for use role change or kick props.
 */
interface UseRoleChangeOrKickProps extends LoadingProps {
    kick?: boolean;
}

/**
 * Hook to manipulate the state information of a specific member.
 *
 * @param { UseRoleChangeOrKickProps } param0 - Use role change or kick props.
 */
export const useRoleChangeOrKick = ({
    kick,
    setLoadingId,
}: UseRoleChangeOrKickProps) => {
    // Modal store functionalities.
    const { data, onOpen } = useModal();

    // Server information.
    const { server: serverModal } = data;

    /**
     * App router.
     */
    const router = useRouter();

    /**
     * Function to ban or change rol a user from the server.
     *
     * @param { string } memberId - Member ID.
     * @param { MemberRole } role - Member role.
     *
     * @returns { Promise<void> } Functionality to ban a user from the server.
     */
    const onRoleChangeOrKick = async (
        memberId: string,
        role?: MemberRole
    ): Promise<void> => {
        try {
            // Change of status to the user whose is being changed.
            setLoadingId(memberId);

            /**
             * Url to cupdate a user's on the server.
             */
            const url = qs.stringifyUrl({
                url: ApiRoutes.member(memberId),
                query: {
                    serverId: serverModal?.id,
                    ...(!kick && { memberId }),
                },
            });

            /**
             * Server information to save in the modal information.
             */
            let server;

            if (kick) {
                // Server with user deleted.
                const { data } = await Axios.delete(url);
                server = data;
            } else {
                // Server with user role change.
                const { data } = await Axios.patch(url, { role });
                server = data;
            }

            // Refresh current page.
            router.refresh();

            // Open updated member modal.
            onOpen(ModalType.MEMBERS, { server });
        } catch (error) {
            console.error(error);
        } finally {
            // User reset state updating.
            setLoadingId('');
        }
    };

    return { onRoleChangeOrKick };
};
