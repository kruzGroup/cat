import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Input } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import InputError from '@/components/input-error';
import { LoaderCircle } from 'lucide-react';
import TextLink from '@/components/text-link';
import { FormEventHandler } from 'react';



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

type RegisterForm = {
    name: string;
    lastname: string;
    username: string;
    email: string;
    gender: string;
    status: string;
    password: string;
    password_confirmation: string;

};  

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
            name: '',
            lastname: '',
            username: '',
            email: '',
            gender: '',
            status: '',
            password: '',
            password_confirmation: '',
        });
    
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
                post(route('users.store'), {
            });
        };
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User | Create" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">                
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-4">
                    <form className="flex flex-col gap-6 mt-2" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    // required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    disabled={processing}
                                    placeholder="Full name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="lastname">Lastname</Label>
                                <Input
                                    id="lastname"
                                    type="text"
                                    // required                                    
                                    tabIndex={2}
                                    autoComplete="lastname"
                                    value={data.name}
                                    onChange={(e) => setData('lastname', e.target.value)}
                                    disabled={processing}
                                    placeholder="Lastname"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <InputError message={errors.lastname} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    // required                                    
                                    tabIndex={3}
                                    autoComplete="username"
                                    value={data.name}
                                    onChange={(e) => setData('username', e.target.value)}
                                    disabled={processing}
                                    placeholder="username"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <InputError message={errors.username} />
                            </div>                                   
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    // required
                                    tabIndex={4}
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    disabled={processing}
                                    placeholder="email@example.com"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <InputError message={errors.email} />
                            </div>
                            
                            <div className="grid gap-2">
                                <Label htmlFor="gender">Gender</Label>
                                <select
                                    id="gender"
                                    name="gender"
                                    tabIndex={5}
                                    value={data.gender}
                                    onChange={(e) => setData('gender', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                    >
                                    <option value="" disabled></option>
                                    <option value="male">Hombre</option>
                                    <option value="female">Mujer</option>
                                </select>
                                <InputError message={errors.gender} />

                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="status">Status</Label>
                                <select
                                    id="status"
                                    name="status"
                                    tabIndex={6}
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                    >
                                    <option value="" disabled></option>
                                    <option value="active">Activo</option>
                                    <option value="inactive">Inactivo</option>
                                </select>
                                <InputError message={errors.status} />

                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    // required
                                    tabIndex={7}
                                    autoComplete="new-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    disabled={processing}
                                    placeholder="Password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">Confirm password</Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    // required
                                    tabIndex={8}
                                    autoComplete="new-password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    disabled={processing}
                                    placeholder="Confirm password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>
                        </div>
                        {/* Divider antes del botón */}
                        <div className="border-t border-gray-200 my-4"></div>
                        <Button type="submit" className="mt-2" tabIndex={9} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Create account
                        </Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
