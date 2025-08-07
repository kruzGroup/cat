import React, { useState, useEffect, useCallback } from 'react';
import { format, set } from 'date-fns';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { type BreadcrumbItem, PageProps } from '@/types/types';
import { useDebouncedCallback } from 'use-debounce';

// Components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"


// Icons
import { UserPlus, UserPen, Eraser, ShieldX, ShieldCheck } from 'lucide-react';
import { PageLinkItem, User } from '@/types';
import AppPagination from '@/components/app-pagination';
import AppUserSearch from '@/components/app-user-search';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Configurations',
        href: '/config/users',
    },
    {
        title: 'Users',
        href: '/config/users',
    },
];

type UsersPaginated = {
    users: User[],
    links: PageLinkItem[]
};

type Filters = {
    search: string,
    perPage: number,
};

type IndexProps = {
    users: UsersPaginated,
    filters: Filters,
};
  
  
  export default function Index({ users, filters } : IndexProps) {
    // console.log(users, filters);
    
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User List" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <AppUserSearch inicialSearch={filters.search} />               
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border dark:bg-sidebar">
                    <Table className="min-w-full border-separate border-spacing-0">
                        <TableHeader className="bg-gray-100 dark:bg-background">
                            <TableRow className="hover:bg-gray-200 dark:hover:bg-accent">
                                <TableHead className="text-gray-700 dark:text-foreground font-medium py-3 pl-4 text-center">Users</TableHead>
                                <TableHead className="text-gray-700 dark:text-foreground font-medium py-3 text-center">Username</TableHead>
                                <TableHead className="text-gray-700 dark:text-foreground font-medium py-3 text-center">Estado</TableHead>
                                <TableHead className="text-gray-700 dark:text-foreground font-medium py-3 text-center">Fecha Creación</TableHead>
                                <TableHead className="text-gray-700 dark:text-foreground font-medium py-3 pr-4 text-center">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {users.data.map((user) => (
                            <TableRow key={user.id} className="hover:bg-teal-200/10 dark:hover:bg-stone-600/10 transition-colors">
                                <TableCell className="py-3 pl-4">
                                <div className="flex items-center space-x-3">
                                    {/* <Avatar className={`border-3 size-10 ${!user.avatar_url ? user.avatar_color : ''}`}>
                                        {user.avatar_url ? (
                                            <AvatarImage 
                                            src={user.avatar_url} 
                                            alt={`Avatar de ${user.full_name}`}
                                            className="object-cover"
                                            />
                                        ) : (
                                            <AvatarFallback className={`text-xs font-bold ${user.avatar_color.replace('text-', '')}`}>
                                            {user.full_name.split(' ')
                                            .filter(name => name.length > 0)
                                            .map(name => name[0].toUpperCase())
                                            .join('')
                                            .substring(0, 2)}
                                            </AvatarFallback>
                                        )}
                                    </Avatar> */}

                                
                                    <div>
                                        <Link href={route('users.show', user.id)}>
                                            <p className="text-xs font-bold text-gray-900 dark:text-gray-50 uppercase ">{user.full_name}</p>
                                            <span className="text-sm text-gray-500 dark:text-gray-200">{user.email}</span>
                                        </Link>                                            
                                    </div>
                                </div>
                                </TableCell>
                                <TableCell className="text-gray-700 dark:text-foreground text-center">
                                    @{user.username.toLowerCase()}
                                </TableCell>
                                <TableCell className='flex justify-center justify-items-center h-full'>
                                    <Tooltip>
                                        <TooltipTrigger asChild>                                                
                                            {user.status === 'active' ? <ShieldCheck className="text-green-500 size-7" /> : <ShieldX className="text-red-500 size-7" />}
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>
                                                {user.statusDisplay}
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>                                    
                                </TableCell>
                                <TableCell className="text-center text-sm text-gray-500 dark:text-muted-foreground">
                                    {format(new Date(user.created_at), 'dd/MM/yyyy')}

                                    
                                </TableCell>
                                <TableCell className="pr-4">
                                <div className="flex justify-center space-x-1">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" className="size-8 hover:border-sky-300" asChild>
                                            <Link href={route('users.edit', user.id)}>
                                                <UserPen className="size-4" />
                                            </Link>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="left">
                                        <p>Editar</p>
                                    </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" className="size-8 hover:border-red-500" asChild>
                                            <Link href={route('users.destroy', user.id)} >
                                                <Eraser className="size-4" />
                                            </Link>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        <p>Delete</p>
                                    </TooltipContent>
                                </Tooltip>
                                    
                                    
                                </div>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {/* Llamamos nuestro componente de paginación */}
                    <AppPagination links={users.links} currentPage={filters.perPage.toString()} />
                </div>
            </div>
        </AppLayout>
    );
}
