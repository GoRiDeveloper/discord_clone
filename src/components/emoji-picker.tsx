import type { FC, JSX } from 'react';
import { Smile } from 'lucide-react';
import { useTheme } from 'next-themes';
import Picker from '@emoji-mart/react';
import EmojiData from '@emoji-mart/data';

import { Popover, PopoverTrigger, PopoverContent } from '@/components';

/**
 * Model for emoji picker component.
 */
interface EmojiPickerProps {
    onChange: (_value: string) => void;
}

/**
 * Emoji picker component.
 *
 * @param { EmojiPickerProps } param0 - Emoji picker props.
 *
 * @returns { JSX.Element } Emoji picker component.
 */
export const EmojiPicker: FC<EmojiPickerProps> = ({
    onChange,
}: EmojiPickerProps): JSX.Element => {
    // App theme functionalities.
    const { resolvedTheme } = useTheme();

    return (
        <Popover>
            <PopoverTrigger>
                <Smile
                    className="
                        text-zinc-500 dark:text-ainc-400 hover:text-zinc-600
                        dark:hover:text-zinc-300 transition
                    "
                />
            </PopoverTrigger>
            <PopoverContent
                className="bg.transparent border-none shadow-none drop-shadow-none mb-16"
                side="right"
                sideOffset={40}
            >
                <Picker
                    theme={resolvedTheme}
                    data={EmojiData}
                    onEmojiSelect={(emoji: any) => onChange(emoji.native)}
                />
            </PopoverContent>
        </Popover>
    );
};
