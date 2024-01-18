import type { FC, JSX } from 'react';

import { Button, DialogFooter } from '@/components';

/**
 * Model for button item props.
 */
interface ButtonItemProps {
    isLoading: boolean;
    btnType: 'Create' | 'Save' | 'Send';
}

/**
 * Button item component.
 *
 * @param { ButtonItemProps } param0 - Button item props.
 *
 * @returns { JSX.Element } Button item component.
 */
export const ButtonItem: FC<ButtonItemProps> = ({
    isLoading,
    btnType,
}: ButtonItemProps): JSX.Element => {
    return (
        <DialogFooter className="bg-gray-100 px-6 py-4">
            <Button variant="primary" type="submit" disabled={isLoading}>
                {' '}
                {btnType}{' '}
            </Button>
        </DialogFooter>
    );
};
