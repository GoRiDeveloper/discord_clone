import z from 'zod';

import { ModalTypeKeys } from '@/models';
import { serverSchema } from '@/schemas';

/**
 * Model for server search props.
 */
export interface ServerSearchProps {
    setOpen: () => void;
}

/**
 * Model for server id props.
 */
export interface ServerIdProps {
    serverId: string;
}

/**
 * Model for server id params.
 */
export interface ServerIdParams {
    params: ServerIdProps;
}

/**
 * Model for use server form props.
 */
export interface ServerFormProps {
    isInitialModal?: boolean;
    modalType: ModalTypeKeys.CREATE_SERVER | ModalTypeKeys.EDIT_SERVER;
}

/**
 * Server form type.
 */
export type ServerType = z.infer<typeof serverSchema>;

/**
 * Server default values.
 */
export const ServerDefaultValues: ServerType = {
    name: '',
    imageUrl: '',
};
