'use client';

import type { FC, JSX, PropsWithChildren } from 'react';

import { ActionTooltipLabel } from '@/components';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

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
    // eslint-disable-next-line no-unused-vars
    align,
}: ActionTooltipProps): JSX.Element => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent side={side}>
                    <ActionTooltipLabel label={label} />
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
