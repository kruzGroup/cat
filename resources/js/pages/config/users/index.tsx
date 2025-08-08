import { useState, useEffect, useCallback } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { type BreadcrumbItem, PageProps } from '@/types/types';
import { Toaster } from 'sonner';

// Components
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import { Input } from "@/components/ui/input"

// Icons
import { UserPlus, UserPen, Eraser, ShieldX, ShieldCheck } from 'lucide-react';
import AppPagination from '@/components/app-pagination';
import { PageLinkItem } from '@/types';
import AppUserSearch from '@/components/app-user-search';
import AppButtonDelete from '@/components/app-button-delete';

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

interface User {
    id: number;
    full_name: string;
    username: string;
    email: string;
    avatar?: string;
    status: string;
    statusDisplay: string;
    statusColor: string;
    created_at: string;
    avatar_url?: string;
    avatar_color: string;
  }
  
  interface User {
    id: number;
    full_name: string;
    username: string;
    email: string;
    avatar?: string;
    status: string;
    statusDisplay: string;
    statusColor: string;
    created_at: string;
    avatar_url?: string;
    avatar_color: string;
    created_at_diffForHumans: string;
  }
  
  type UsersPaginated = {
      data: User[],
      links: PageLinkItem[]
  };
  
  type Filters = {
      search: string,
      perPage: number,
  };

  type IndexProps = {
      users: UsersPaginated,
      filters: Filters & { status: string | null },
  };
  
    export default function Index({ users, filters,  } : IndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const page = usePage();


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User List" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">                
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border dark:bg-sidebar">
                    {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                    <AppUserSearch inicialSearch={filters.search} filters={filters} />
                    <div className='overflow-x-auto border border-gray-200 dark:border-neutral-700 rounded-lg m-4'>
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
                                {users.data.map((user: User) => (
                                <TableRow key={user.id} className="hover:bg-teal-200/10 dark:hover:bg-stone-600/10 transition-colors border-b-4 border-amber-300">
                                    <TableCell className="py-3 pl-4" >
                                    <div className="flex items-center space-x-3">
                                        <Avatar className={`border-3 size-10 ${!user.avatar_url ? user.avatar_color : ''}`}>
                                            {user.avatar_url ? (
                                                <AvatarImage 
                                                src={user.avatar_url} 
                                                alt={`Avatar de ${user.full_name}`}
                                                className="object-cover"
                                                />
                                            ) : (
                                                <AvatarFallback className={`text-xs font-bold ${user.avatar_color.replace('text-', '')}`}>
                                                {user.full_name.split(' ')
                                                .filter((name: string) => name.length > 0)
                                               .map((name: string) => name[0].toUpperCase())
                                                .join('')
                                                .substring(0, 2)}
                                                </AvatarFallback>
                                            )}
                                        </Avatar>
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
                                        

                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Label>{user.created_at}</Label>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom">
                                            <p>{user.created_at_diffForHumans}</p>
                                        </TooltipContent>
                                    </Tooltip>


                                     
                                    
                                    
                                    </TableCell>
                                    <TableCell className="pr-4">
                                    <div className="flex justify-center space-x-1">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            {/* <Button variant="outline" size="icon" className="size-8 hover:border-sky-300" asChild>
                                                <Link href={route('users.edit', user.id)}>
                                                    <UserPen className="size-4" />
                                                </Link>
                                            </Button> */}
                                            <Sheet>
                                            <SheetTrigger asChild>
                                                {/* <Button variant="outline">Open</Button> */}
                                                <Button variant="outline" size="icon" className="size-8 hover:border-sky-300" asChild>
                                                    <a>
                                                        <UserPen className="size-4" />
                                                    </a>
                                                </Button>
                                            </SheetTrigger>
                                            <SheetContent>
                                                <SheetHeader>
                                                <SheetTitle>Edit profile</SheetTitle>
                                                <SheetDescription>
                                                    Make changes to your profile here. Click save when you&apos;re done.
                                                </SheetDescription>
                                                </SheetHeader>
                                                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="sheet-demo-name">Name</Label>
                                                    <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
                                                </div>
                                                <div className="grid gap-3">
                                                    <Label htmlFor="sheet-demo-username">Username</Label>
                                                    <Input id="sheet-demo-username" defaultValue="@peduarte" />
                                                </div>
                                                </div>
                                                <SheetFooter>
                                                <Button type="submit">Save changes</Button>
                                                <SheetClose asChild>
                                                    <Button variant="outline">Close</Button>
                                                </SheetClose>
                                                </SheetFooter>
                                            </SheetContent>
                                        </Sheet>
                                        </TooltipTrigger>
                                        <TooltipContent side="left">
                                            <p>Editar</p>
                                        </TooltipContent>
                                        
                                    </Tooltip>
                                    <AppButtonDelete user={user} />
                                    {/* <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" size="icon" className="size-8 hover:border-red-500">
                                                <Eraser className="size-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="left">
                                            <p>Eliminar</p>
                                        </TooltipContent>
                                    {/* <AlertDialog>
                                        <Tooltip>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="outline" size="icon" className="size-8 hover:border-red-500">
                                                    <Eraser className="size-4" />
                                                </Button>
                                            </AlertDialogTrigger>
                                        </Tooltip>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>¿Eliminar este usuario?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    ¿Estás seguro de que quieres eliminar a: {user.full_name}? Esta acción no se puede deshacer.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                    Cancelar
                                                </AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete(user.id)}>
                                                    Eliminar
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog> */}
                                        
                                    </div>
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    {/* Llamamos nuestro componente de paginación */}
                    <AppPagination links={users.links} currentPage={filters.perPage.toString()} />
                    
                    
                </div>
            </div>
            {/* Componente Toaster de Sonner */}
            <Toaster richColors closeButton />
        </AppLayout>
    );
}
