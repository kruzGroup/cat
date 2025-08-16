
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Head, Link, router, useForm } from '@inertiajs/react';

// icons
import { UserPlus } from 'lucide-react';
import React from "react";



interface Props {
    inicialSearch: string;
    filters: any; // TODO: Define the correct type for filters
}

export default function AppUserSearch({ inicialSearch, filters }: Props) {
    // state whit Inertia
    const {data, setData} = useForm<{search: string}>({
        search: inicialSearch || '',
    })
    const [timeoutId, setTimeoutId] = React.useState<NodeJS.Timeout | null>(null);
    // Clean up component unmount
    React.useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        }
    }, [timeoutId]);

    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userInput = (e.target.value);
        setData('search', userInput);

        // Clear previous timeout if it exists
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // Set a new timeout to delay the search
        const newTimeoutId = setTimeout(() => {
            const queryString = userInput ? {search: userInput} : {};

            router.get(route('users.index'), queryString, {
                preserveState: true,
                preserveScroll: true,
            })
        }, 500); // Adjust the delay as needed (500ms in this case)
        setTimeoutId(newTimeoutId);
    };  

    return (        
            <div className="flex items-center space-x-4">
                <Input 
                    placeholder="name, username or email..." 
                    onChange={handleChange}
                    name='search'
                    value={data.search}
                    autoComplete="off"
                    autoFocus
                    type="search"
                    className="w-64" 
                />
                
                <Select onValueChange={(value) => {
                    const url = new URL(window.location.href);
                    if (value !== 'all') {
                        url.searchParams.set('status', value);
                    } else {
                        url.searchParams.delete('status');
                    }
                    window.location.href = url.toString();
                }}>
                    <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por estado" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="active">Activos</SelectItem>
                    <SelectItem value="inactive">Inactivos</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            
        
    )
}
