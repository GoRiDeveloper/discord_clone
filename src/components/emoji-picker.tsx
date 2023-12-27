'use client';

import EmojiData from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Smile } from 'lucide-react';
import { useTheme } from 'next-themes';
import type { FC, JSX } from 'react';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

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
                className="bg-transparent border-none shadow-none drop-shadow-none mb-16"
                side="right"
                sideOffset={-20}
            >
                <Picker
                    theme={resolvedTheme}
                    data={EmojiData}
                    onEmojiSelect={(emoji: any) => onChange(emoji.native)}
                    emojiButtonSize={28}
                />
            </PopoverContent>
        </Popover>
    );
};
