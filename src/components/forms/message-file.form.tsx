import type { FC, JSX } from 'react';

import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FileUpload,
    ButtonItem,
} from '@/components';
import { useMessageFile } from '@/hooks';

/**
 * Message file form component.
 * 
 * @returns { JSX.Element } Message file form component.
 */
export const MessageFileForm: FC = (): JSX.Element => {
    const { form, isLoading, onSubmit } = useMessageFile();

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-8 sm:px-6">
                    <div className="flex items-center justify-center text-center">
                        <FormField
                            control={form.control}
                            name="fileUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <FileUpload
                                            endpoint="messageFile"
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <ButtonItem isLoading={isLoading} btnType="Send" />
            </form>
        </Form>
    );
};
