import type { FC, JSX } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

import { FormItem, FormControl, FormMessage, FileUpload } from '@/components';
import { ServerType } from '@/models';

/**
 * Model for image item props.
 */
interface ImageItemProps {
    field: ControllerRenderProps<ServerType, 'imageUrl'>;
}

/**
 * Image item component.
 *
 * @param param0 - Image item props.
 *
 * @returns { JSX.Element } Image item component.
 */
export const ImageItem: FC<ImageItemProps> = ({
    field,
}: ImageItemProps): JSX.Element => {
    return (
        <FormItem>
            <FormControl>
                <FileUpload
                    endpoint="serverImage"
                    value={field.value}
                    onChange={field.onChange}
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    );
};
