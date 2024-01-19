'use client'; // Error components must be Client Components

import type { FC, JSX } from 'react';

import { ErrorDialog } from '@/components';
import type { ErrorProps } from '@/models';

const Error: FC<ErrorProps> = ({ error, reset }: ErrorProps): JSX.Element => {
    return <ErrorDialog error={error} reset={reset} />;
};

export default Error;
