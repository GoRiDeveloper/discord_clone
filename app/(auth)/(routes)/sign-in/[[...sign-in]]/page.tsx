import type { FC, JSX } from 'react';
import { SignIn } from '@clerk/nextjs';

import { BASE_URL } from '@/models';

/**
 * User Registration Modal Component.
 *
 * @returns { JSX.Element } User Registration Modal Component.
 */
const SignInPage: FC = (): JSX.Element => <SignIn afterSignInUrl={BASE_URL} />;

export default SignInPage;
