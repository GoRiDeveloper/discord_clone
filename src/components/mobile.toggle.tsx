import type { FC, JSX } from 'react';
import { Menu } from 'lucide-react';

import {
    Sheet,
    SheetTrigger,
    SheetContent,
    Button,
    NavigationSidebar,
    ServerSidebar,
} from '@/components';

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
                <ServerSidebar serverId={serverId} />
            </SheetContent>
        </Sheet>
    );
};
