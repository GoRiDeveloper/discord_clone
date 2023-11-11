import type { FC, JSX } from 'react';
import { Button } from '@/components';

const Home: FC = (): JSX.Element => {
    return (
        <div className="flex flex-col">
            <p className="text-3xl font-bold text-indigo-500">
                hello discord clone
            </p>
            <Button> Click Me </Button>
        </div>
    );
};

export default Home;
