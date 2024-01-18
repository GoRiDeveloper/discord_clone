import { SignUp } from '@clerk/nextjs';
import type { FC, JSX } from 'react';

import { BASE_URL } from '@/models';

/**
 * User Authentication Modal Component.
 *
 * @returns { JSX.Element } User Authentication Modal Component.
 */
const SignUpPage: FC = (): JSX.Element => (
    <SignUp redirectUrl={BASE_URL} afterSignUpUrl={BASE_URL} />
);

export default SignUpPage;
