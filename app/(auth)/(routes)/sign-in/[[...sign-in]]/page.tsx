import { SignIn } from '@clerk/nextjs';
import type { FC, JSX } from 'react';

import { BASE_URL } from '@/models';
console.log(BASE_URL);
/**
 * User Registration Modal Component.
 *
 * @returns { JSX.Element } User Registration Modal Component.
 */
const SignInPage: FC = (): JSX.Element => (
    <SignIn redirectUrl={BASE_URL} afterSignInUrl={BASE_URL} />
);

export default SignInPage;
