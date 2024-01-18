import { ChannelType } from '@prisma/client';
import type { ControllerRenderProps } from 'react-hook-form';
import type { FC, JSX } from 'react';

import {
    FormControl,
    FormItem,
    FormLabel,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components';
import { ChannelFormType } from '@/models';

/**
 * Model for select channel item props.
 */
interface SelectChannelItemProps {
    field: ControllerRenderProps<ChannelFormType, 'type'>;
    isLoading: boolean;
}

/**
 * Select channel item component.
 *
 * @param param0 - Select channel item props.
 *
 * @returns { JSX.Element } Select channel item component.
 */
export const SelectChannelItem: FC<SelectChannelItemProps> = ({
    field,
    isLoading,
}: SelectChannelItemProps): JSX.Element => {
    return (
        <FormItem>
            <FormLabel> Channel Type </FormLabel>
            <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                defaultValue={field.value}
            >
                <FormControl>
                    <SelectTrigger
                        className="
                            focus:ring-offset-0 focus:ring-0
                            bg-zinc-300/50 ring-offset-0 capitalize
                            outline-none
                        "
                    >
                        <SelectValue placeholder="Select a channel type" />
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {Object.values(ChannelType).map((type) => (
                        <SelectItem
                            key={type}
                            value={type}
                            className="capitalize"
                        >
                            {type.toLowerCase()}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </FormItem>
    );
};
