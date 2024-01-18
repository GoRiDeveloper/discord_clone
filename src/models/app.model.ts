/**
 * App Port.
 */
const PORT = process.env.NEXT_PUBLIC_DEV_PORT || process.env.DEV_PORT || '3000';

/**
 * Develooer mode base url.
 */
const DEV_BASE_URL = `http://localhost:${PORT}/`;

/**
 * Base URL.
 */
export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? DEV_BASE_URL;

/**
 * App errors.
 */
export enum AppErrors {
    SERVER_NAME_REQUIRED = 'Server name is required.',
    SERVER_IMG_REQUIRED = 'Server image is required.',
    CHANNEL_NAME_REQUIRED = 'Channel name is required.',
    CHANNEL_NOT_GENERAL = 'Channel name cannot be "general"',
    ATTACHMENT_REQUIRED = 'Attachment is required.',
}
