import type { FC, JSX } from 'react';
import { SignUp } from '@clerk/nextjs';

/**
 * User Authentication Modal Component.
 *
 * @returns { JSX.Element } User Authentication Modal Component.
 */
const SignUpPage: FC = (): JSX.Element => <SignUp />;

export default SignUpPage;
