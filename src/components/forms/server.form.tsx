import type { FC, JSX } from 'react';

import { ButtonItem, Form, FormField, ImageItem, NameItem } from '@/components';
import { useServerForm } from '@/hooks';
import { ModalTypeKeys, type ServerFormProps } from '@/models';

/**
 * Server form component.
 *
 * @returns { JSX.Element } Server form component.
 */
export const ServerForm: FC<ServerFormProps> = ({
    isInitialModal,
    modalType,
}: ServerFormProps): JSX.Element => {
    const { form, isLoading, onSubmitForm } = useServerForm({
        isInitialModal,
        modalType,
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmitForm)}
                className="space-y-8"
            >
                <div className="space-y-8 sm:px-6">
                    <div className="flex items-center justify-center text-center">
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => <ImageItem field={field} />}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <NameItem
                                title="Server"
                                field={field}
                                isLoading={isLoading}
                            />
                        )}
                    />
                </div>
                <ButtonItem
                    btnType={
                        modalType === ModalTypeKeys.CREATE_SERVER
                            ? 'Create'
                            : 'Save'
                    }
                    isLoading={isLoading}
                />
            </form>
        </Form>
    );
};
