import { SignIn } from '@clerk/nextjs';
import type { FC, JSX } from 'react';

import { BASE_URL } from '@/models';

/**
 * User Registration Modal Component.
 *
 * @returns { JSX.Element } User Registration Modal Component.
 */
const SignInPage: FC = (): JSX.Element => {
    console.log({ BASE_URL });
    return <SignIn afterSignInUrl={BASE_URL} />;
};

export default SignInPage;
