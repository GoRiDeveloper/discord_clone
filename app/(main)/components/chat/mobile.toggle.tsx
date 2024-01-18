import { Menu } from 'lucide-react';
import { Suspense, type FC, type JSX } from 'react';

import { Button, Sheet, SheetContent, SheetTrigger } from '@/components';
import ErrorBoundary from '@/components/error.boundary';
import {
    ServerSidebar,
    ServerErrorSection,
    ServerLoading,
} from '../../components';

import { NavigationSidebar } from '../navigation';

/**
 * Model mobile toggle props.
 */
interface MobileToggleProps {
    serverId: string;
}

/**
 * Mobile toggle component.
 *
 * @param { MobileToggleProps } param0 - Mobile toggle props.
 *
 * @returns { JSX.Element } Mobile toggle component.
 */
export const MobileToggle: FC<MobileToggleProps> = ({
    serverId,
}: MobileToggleProps): JSX.Element => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 flex gap-0">
                <div className="w-[72px]">
                    <NavigationSidebar />
                </div>
                <ErrorBoundary fallback={<ServerErrorSection />}>
                    <Suspense fallback={<ServerLoading />}>
                        <ServerSidebar serverId={serverId} />
                    </Suspense>
                </ErrorBoundary>
            </SheetContent>
        </Sheet>
    );
};
