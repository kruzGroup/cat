import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Input } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User',
        href: '/users',
    },
    {
        title: 'Create',
        href: '/users/create',
    },
];



  

export default function Create() {
    const {data, setData, post, processing, errors} = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User | Create" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-4">
                <form  className="space-y-4">
                    <Input
                        type="text"
                        placeholder="Name"
                        className="w-full"
                        autoComplete="off"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <Input
                        type="email"
                        placeholder="Email"
                        className="w-full"
                        autoComplete="off"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                </form>
                </div>
            </div>
        </AppLayout>
    );
}
