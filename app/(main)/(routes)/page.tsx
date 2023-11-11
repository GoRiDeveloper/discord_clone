import type { FC, JSX } from 'react';
import { UserButton } from '@clerk/nextjs';

const Home: FC = (): JSX.Element => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <UserButton afterSignOutUrl="/" />
        </div>
    );
};

export default Home;
