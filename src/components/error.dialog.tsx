'use client';

import { useEffect, type FC, type JSX } from 'react';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    Button,
} from '@/components';
import type { ErrorProps } from '@/models';

/**
 * Error dialog component.
 *
 * @param { ResetBtnProps } param0 - Error dialog props.
 *
 * @returns { JSX.Element } Error dialog component.
 */
export const ErrorDialog: FC<ErrorProps> = ({
    error,
    reset,
}: ErrorProps): JSX.Element => {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="max-w-full w-full h-full">
            <Dialog open>
                <DialogContent className="bg-white text-black p-0 overflow-hidden">
                    <DialogHeader className="pt-8 px-6">
                        <DialogTitle className="text-2xl text-center font-bold">
                            {' '}
                            Something went wrong!{' '}
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            {' '}
                            Press the button to try to solve the error or try
                            again later{' '}
                        </DialogDescription>
                    </DialogHeader>
                    <Button
                        variant="primary"
                        className="hover:bg-sky-500 border-none"
                        onClick={
                            // Attempt to recover by trying to re-render the segment
                            () => reset()
                        }
                    >
                        Try again
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
};
