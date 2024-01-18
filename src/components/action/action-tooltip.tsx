'use client';

import type { FC, JSX, PropsWithChildren } from 'react';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { ActionTooltipLabel } from './action-tooltip.label';

/**
 * Model for action tooltip component.
 */
interface ActionTooltipProps extends PropsWithChildren {
    label: string;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
}

/**
 * Action tooltip component.
 *
 * @param { ActionTooltipProps } param0 - Action tooltip component props.
 *
 * @returns { JSX.Element } Action tooltip component.
 */
export const ActionTooltip: FC<ActionTooltipProps> = ({
    label,
    children,
    side,
    align,
}: ActionTooltipProps): JSX.Element => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent side={side} align={align}>
                    <ActionTooltipLabel label={label} />
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
