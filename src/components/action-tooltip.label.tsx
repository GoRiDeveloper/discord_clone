import type { FC, JSX } from 'react';

/**
 * Model for action tooltip label.
 */
interface ActionTooltipLabelProps {
    label: string;
}

/**
 * Action tooltip label component.
 *
 * @param { ActionTooltipLabelProps } param0
 *  - Action tooltip label component props.
 *
 * @returns { JSX.Element } Action tooltip label component.
 */
export const ActionTooltipLabel: FC<ActionTooltipLabelProps> = ({
    label,
}: ActionTooltipLabelProps): JSX.Element => {
    return (
        <p className="font-semibold text-sm capitalize">
            {label.toLocaleLowerCase()}
        </p>
    );
};
