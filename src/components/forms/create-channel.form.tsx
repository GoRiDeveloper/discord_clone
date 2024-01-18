import type { FC, JSX } from 'react';

import {
    Form,
    FormField,
    SelectChannelItem,
    NameItem,
    ButtonItem,
} from '@/components';
import { ModalTypeKeys, type ChannelProps } from '@/models';
import { useChannelForm } from '@/hooks';

/**
 * Create channel form component.
 *
 * @param { ChannelProps } param0 - Create channel form props.
 *
 * @returns { JSX.Element } Create channel form component.
 */
export const ChannelForm: FC<ChannelProps> = ({
    modalType,
}: ChannelProps): JSX.Element => {
    const { form, isLoading, onSubmit } = useChannelForm({
        modalType,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-8 sm:px-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <NameItem
                                title="Channel"
                                field={field}
                                isLoading={isLoading}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <SelectChannelItem
                                field={field}
                                isLoading={isLoading}
                            />
                        )}
                    />
                </div>
                <ButtonItem
                    btnType={
                        modalType === ModalTypeKeys.CREATE_CHANNEL
                            ? 'Create'
                            : 'Save'
                    }
                    isLoading={isLoading}
                />
            </form>
        </Form>
    );
};
