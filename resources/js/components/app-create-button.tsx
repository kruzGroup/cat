import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { UserPlus } from 'lucide-react';
import React from 'react';

interface AppCreateButtonProps {
    route: string;
    icon: React.ElementType;
    tooltipText: string;
}

export function AppCreateButton({ route, icon: Icon, tooltipText }: AppCreateButtonProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="size-9 hover:border-sky-300" asChild>
                    <Link href={route}>
                        <Icon className="size-5" />
                    </Link>
                </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
                <p>{tooltipText}</p>
            </TooltipContent>
        </Tooltip>
    );
}