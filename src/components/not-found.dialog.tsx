import Link from 'next/link';
import type { FC, JSX } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components';
import { AppRoutes } from '@/models';

export const NotFoundModal: FC = (): JSX.Element => {
    return (
        <div className="max-w-full w-full h-full">
            <Dialog open>
                <DialogContent className="bg-white text-black p-0 overflow-hidden">
                    <DialogHeader className="pt-8 px-6">
                        <DialogTitle className="text-2xl text-center font-bold">
                            Error 404: ¡Page Not Found!
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            {' '}
                            The page you are looking for was not found, to
                            redirect to home press the button{' '}
                        </DialogDescription>
                    </DialogHeader>
                    <Link
                        className="
                            w-full text-center px-5 bg-blue-500 hover:bg-blue-400
                            transition-colors font-semibold
                        "
                        href={AppRoutes.HOME}
                    >
                        {' '}
                        Return home{' '}
                    </Link>
                </DialogContent>
            </Dialog>
        </div>
    );
};
