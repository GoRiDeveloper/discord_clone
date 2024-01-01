import { redirect } from 'next/navigation';

import { db } from '@/lib';

/**
 * Model for the function of directing a specific server.
 */
interface RedirectToSpecificServerProps {
    inviteCode?: string;
    profileId: string;
    inviteCodeRedirect: boolean;
}

/**
 * Function to redirect to a specific server based on the parameters of that server.
 *
 * @param { RedirectToSpecificServerProps } param0 - Redirect props to a server.
 *
 * @returns { Promise<void | never> } If the server exists, redirect to this specific server.
 */
export const redirectToSpecificServer = async ({
    inviteCode,
    profileId,
    inviteCodeRedirect,
}: RedirectToSpecificServerProps): Promise<void | never> => {
    /**
     * Invitation code server.
     */
    const server = inviteCodeRedirect
        ? await db.server.update({
              where: {
                  inviteCode: inviteCode,
              },
              data: {
                  members: {
                      create: [
                          {
                              profileId: profileId,
                          },
                      ],
                  },
              },
          })
        : await db.server.findFirst({
              where: {
                  members: {
                      some: {
                          profileId: profileId,
                      },
                  },
              },
          });

    // If the invitation code server, return the found server.
    if (server) return redirect(`/servers/${server.id}`);
};
