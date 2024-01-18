import type { FC, JSX } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';

import {
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    Input,
} from '@/components';
import { ServerType, ChannelFormType } from '@/models';

/**
 * Model for field type.
 */
type FieldType =
    | ControllerRenderProps<ServerType, 'name'>
    | ControllerRenderProps<ChannelFormType, 'name'>;

/**
 * Model for name item props.
 */
interface NameItemProps {
    field: FieldType;
    title: string;
    isLoading: boolean;
}

/**
 * Name item component.
 *
 * @param { NameItemProps } param0 - Name item props.
 *
 * @returns { JSX.Element } Name item component.
 */
export const NameItem: FC<NameItemProps> = ({
    field,
    title,
    isLoading,
}: NameItemProps): JSX.Element => {
    return (
        <FormItem>
            <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                {' '}
                {title} name{' '}
            </FormLabel>
            <FormControl>
                <Input
                    className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                    placeholder={`Enter ${title.toLocaleLowerCase()} name`}
                    disabled={isLoading}
                    {...field}
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    );
};
