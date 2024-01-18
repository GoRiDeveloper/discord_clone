import { auth } from '@clerk/nextjs';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

import { ApiErrors } from '@/models';

const f = createUploadthing();

/**
 * Handler to get user authentication information.
 *
 * @returns { any } Reference to save authenticated user information or unauthorized error.
 */
const handleAuth = (): any => {
    /**
     * Reference to save authenticated user information.
     */
    const { userId } = auth();

    // Verify if there is information about the authenticated user, if not we send an authorization error.
    if (!userId) throw new Error(ApiErrors.UNAUTHORIZED);

    // Return reference to save authenticated user information.
    return { userId };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    serverImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),
    messageFile: f(['image', 'pdf'])
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
