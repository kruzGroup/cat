export interface PageProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface AppPaginationProps {
    links: PageLinkItem[];
    currentPage: string;
}


export type PageLinkItem = {
    active: boolean;
    label: string;
    url: string | null;
  };


