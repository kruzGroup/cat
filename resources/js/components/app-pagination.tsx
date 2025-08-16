import { Link, router } from "@inertiajs/react";
import { AppPaginationProps, PageLinkItem } from "@/types";

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from "react";

export default function AppPagination({links, currentPage} : AppPaginationProps) {

        const [perPage, setPerPage] = useState<string>(currentPage);

        const handleChange = (value: string) => {
            const newPerPage = value;
            setPerPage(newPerPage);

            router.get(route('users.index'), {perPage: newPerPage}, {
                preserveState: true,
                preserveScroll: true,
            });
        }

    // Extraer los links prev y next para separarlos
    const prevLink = links[0];
    const nextLink = links[links.length - 1];
    const pageLinks = links.slice(1, -1);

    return (
        
        <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
                <Select value={perPage} onValueChange={handleChange} >
                    <SelectTrigger className="w-[80px] border border-slate-400 dark:border dark:border-slate-400 dark:text-slate-100">
                        <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            
            <Pagination>
                <PaginationContent className="flex items-end justify-between-end">
                    {/* Botón Previous */}
                    <PaginationItem>
                        <PaginationPrevious
                            href={prevLink?.url ?? '#'}
                            className={!prevLink?.url ? 'opacity-50 pointer-events-none' : 'border border-slate-400 dark:border dark:border-slate-400 h-8'}
                        />
                    </PaginationItem>
                    {/* Páginas numeradas */}
                    {pageLinks.map((link: PageLinkItem, index: number) => (
                    <PaginationItem key={index}>
                        {link.label.includes('...') ? (
                        <PaginationEllipsis />
                        ) : (
                        <Link
                            href={link?.url ?? '#'}
                            className={`
                                ${link?.active
                                    ? 'bg-amber-200 text-white hover:bg-amber-600 hover:border-slate-400'
                                    : 'bg-neutral-100 hover:bg-neutral-200/10 text-slate-700 dark:border border border-slate-400 dark:border-slate-400 dark:bg-neutral-900 dark:hover:bg-neutral-700 dark:text-slate-100'}
                                text-xs inline-flex h-8 w-8 items-center justify-center rounded-md border data-[active=true]:bg-amber-500 data-[active=true]:text-white hover:bg-amber-600'}
                            `}
                            data-active={link?.active}
                            >
                            <span dangerouslySetInnerHTML={{ __html: link?.label }} />
                        </Link>
                        )}
                    </PaginationItem>
                    ))}
                    {/* Botón Next */}
                    <PaginationItem>
                        <PaginationNext
                            href={nextLink?.url ?? '#'}
                            className={!nextLink?.url ? 'opacity-50 pointer-events-none  ' : 'border border-slate-400 dark:border dark:border-slate-400 h-8'}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
};