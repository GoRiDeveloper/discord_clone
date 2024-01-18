import type { FC, JSX } from 'react';
import { FileIcon } from 'lucide-react';

/**
 * Model for chat item is image props.
 */
interface ChatItemIsPDFProps {
    fileUrl: string;
}

/**
 * Chat item is PDF component.
 *
 * @param param0 - Chat item is PDF props.
 *
 * @returns { JSX.Element } Chat item is PDF component.
 */
export const ChatItemIsPDF: FC<ChatItemIsPDFProps> = ({
    fileUrl,
}: ChatItemIsPDFProps): JSX.Element => {
    return (
        <div className="relative flex items-central p-2 mt-2 rounded-md bg-background/10">
            <FileIcon className="w-10 h-10 fill-indigo-200 stroke-indigo-400" />
            <a
                className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
                href={fileUrl}
            >
                PDF File
            </a>
        </div>
    );
};
