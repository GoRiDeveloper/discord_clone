import { useToggle, useModal, useOrigin } from '@/hooks';
import { AppRoutes } from '@/models';

/**
 * Functional hook to copy the invitation code.
 */
export const useCopyCode = () => {
    // Status for copied url.
    const { status: copied, toggleStatus: setCopied } = useToggle();

    // Modal store functionalities.
    const { data } = useModal();

    /**
     * Url string origin.
     */
    const origin = useOrigin();

    /**
     * Server information.
     */
    const { server } = data;

    /**
     * Server invitation url.
     */
    const inviteUrl = AppRoutes.INVITE_URL(origin, server?.inviteCode);

    /**
     * Function to copy invitation code to server.
     */
    const onCopy = () => {
        // Functionality to copy the invitation link to the system/device.
        navigator.clipboard.writeText(inviteUrl);
        // Change status, from url copy status, to copied
        setCopied();

        // Change status, from url copy status, to not copied, after 1 second.
        setTimeout(() => {
            setCopied();
        }, 1000);
    };

    return { inviteUrl, copied, onCopy };
};
