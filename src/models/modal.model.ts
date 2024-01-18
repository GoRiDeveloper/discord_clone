/**
 * Modal types enum.
 */
export enum ModalType {
    CREATE_CHANNEL = 'createChannel',
    DELETE_CHANNEL = 'deleteChannel',
    DELETE_MESSAGE = 'deleteMessage',
    CREATE_SERVER = 'createServer',
    DELETE_SERVER = 'deleteServer',
    MESSAGE_FILE = 'messageFile',
    LEAVE_SERVER = 'leaveServer',
    EDIT_CHANNEL = 'editChannel',
    EDIT_SERVER = 'editServer',
    MEMBERS = 'members',
    INVITE = 'invite',
}

/**
 * Modal keys enum.
 */
export enum ModalTypeKeys {
    CREATE_CHANNEL = 'CREATE_CHANNEL',
    DELETE_CHANNEL = 'DELETE_CHANNEL',
    DELETE_MESSAGE = 'DELETE_MESSAGE',
    CREATE_SERVER = 'CREATE_SERVER',
    DELETE_SERVER = 'DELETE_SERVER',
    MESSAGE_FILE = 'MESSAGE_FILE',
    LEAVE_SERVER = 'LEAVE_SERVER',
    EDIT_CHANNEL = 'EDIT_CHANNEL',
    EDIT_SERVER = 'EDIT_SERVER',
    MEMBERS = 'MEMBERS',
    INVITE = 'INVITE',
}

/**
 * Model for modal types.
 */
export interface ModalTypeProps {
    modalType: keyof typeof ModalType;
}
