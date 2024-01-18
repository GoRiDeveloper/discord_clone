import { SignIn } from '@clerk/nextjs';
import type { FC, JSX } from 'react';

import { BASE_URL } from '@/models';

/**
 * User Registration Modal Component.
 *
 * @returns { JSX.Element } User Registration Modal Component.
 */
const SignInPage: FC = (): JSX.Element => <SignIn />;

export default SignInPage;
