import type { FC, JSX } from 'react';
import Image from 'next/image';

/**
 * Model for chat item is image props.
 */
interface ChatItemIsImageProps {
    fileUrl: string;
    content: string;
}

/**
 * Chat item is image component.
 *
 * @param param0 - Chat item is image props.
 *
 * @returns { JSX.Element } Chat item is image component.
 */
export const ChatItemIsImage: FC<ChatItemIsImageProps> = ({
    fileUrl,
    content,
}: ChatItemIsImageProps): JSX.Element => {
    return (
        <a
            className="
                relative aspect-square rounded-md mt-2 overflow-hidden border flex
                items-center bg-secondary h-48 w-48
            "
            target="_blank"
            rel="noopener noreferrer"
            href={fileUrl}
        >
            <Image className="object-cover" src={fileUrl} alt={content} fill />
        </a>
    );
};
