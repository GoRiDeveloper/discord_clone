import type { FC, JSX } from 'react';
import { SignIn } from '@clerk/nextjs';

/**
 * User Registration Modal Component.
 *
 * @returns { JSX.Element } User Registration Modal Component.
 */
const SignInPage: FC = (): JSX.Element => <SignIn />;

export default SignInPage;
