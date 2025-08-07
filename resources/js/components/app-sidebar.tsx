import { useState, useEffect } from "react"
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarFooter } from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { SunMoon, Boxes, Landmark, MapPinned, UserCog, DoorClosedLocked, FileDigit, FileClock, FileInput, FileSearch, IdCardLanyard, Pickaxe, ClipboardCheck, LayoutGrid, SlidersHorizontal, ChevronDown, Users, Combine, BriefcaseBusiness } from 'lucide-react';


import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
];


const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     href: 'https://github.com/laravel/react-starter-kit',
    //     icon: Folder,
    // },
    // {
    //     title: 'Documentation',
    //     href: 'https://laravel.com/docs/starter-kits#react',
    //     icon: BookOpen,
    // },
];

type MenuItem = {
    key: string;
    path: string;
    icon: React.ReactNode;
    label: string;
    parentKey?: string;
  };

  export function AppSidebar() {
    //const location = useLocation();

    // Definición de los ítems del menú
    const menuItems: MenuItem[] = [
      // Configuraciones
      { key: 'configurations', path: '', icon: <SlidersHorizontal />, label: 'Configuraciones' },
      { key: 'users', path: '/config/users', icon: <UserCog />, label: 'Usuarios', parentKey: 'configurations' },
      { key: 'appearance', path: '/settings/appearance', icon: <SunMoon />, label: 'Apariencia', parentKey: 'configurations' },
      { key: 'units', path: '/config/units', icon: <Combine />, label: 'Unidades', parentKey: 'configurations' },
      { key: 'jobtitles', path: '/config/jobtitles', icon: <Pickaxe />, label: 'Cargos Laborales', parentKey: 'configurations' },
      { key: 'employees', path: '/config/employees', icon: <IdCardLanyard />, label: 'Empleados', parentKey: 'configurations' },
      { key: 'alcaldias', path: '/config/alcaldias', icon: <Landmark />, label: 'Alcaldía', parentKey: 'configurations' },

      // Catastro Empresas
      { key: 'catastro-empresas', path: '', icon: <Boxes />, label: 'Catastro Empresas' },
      { key: 'taxpayers', path: '/units/cat-empresas/taxpayers', icon: <Users />, label: 'Contribuyentes', parentKey: 'catastro-empresas' },
      { key: 'companies', path: '/units/cat-empresas/companies', icon: <BriefcaseBusiness />, label: 'Empresas', parentKey: 'catastro-empresas' },
      { key: 'licenses', path: '/units/cat-empresas/licenses', icon: <FileSearch />, label: 'Licencias', parentKey: 'catastro-empresas' },

      // Formularios
      { key: 'formularios', path: '', icon: <FileInput />, label: 'Formularios' },
      { key: 'inspections', path: '/forms/inspections', icon: <ClipboardCheck />, label: 'Inspecciones', parentKey: 'formularios' },
      { key: 'statements', path: '/forms/statements', icon: <FileDigit />, label: 'Declaración Jurada', parentKey: 'formularios' },
      { key: 'permits', path: '/forms/permits', icon: <FileClock />, label: 'Permisos', parentKey: 'formularios' },
      { key: 'closings', path: '/forms/closings', icon: <DoorClosedLocked />, label: 'Cierres de Negocio', parentKey: 'formularios' },
      { key: 'missions', path: '/forms/missions', icon: <MapPinned />, label: 'Misiones', parentKey: 'formularios' },
    ];

    // Estado para controlar qué collapsibles están abiertos
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
    const [activeItem, setActiveItem] = useState<string>('');

    // Efecto para determinar el ítem activo y abrir la sección correspondiente
    useEffect(() => {
      const currentItem = menuItems.find(item =>
        item.path && location.pathname.startsWith(item.path)
      );

      if (currentItem) {
        setActiveItem(currentItem.key);

        // Si el ítem tiene un padre, abrir esa sección
        if (currentItem.parentKey) {
          setOpenSections(prev => ({
            ...prev,
            [currentItem.parentKey]: true
          }));
        }
      }
    }, [location.pathname]);

    // Función para alternar secciones colapsables
    const toggleSection = (sectionKey: string) => {
      setOpenSections(prev => ({
        ...prev,
        [sectionKey]: !prev[sectionKey]
      }));
    };

    // Agrupar ítems por sección principal
    const menuSections = menuItems.reduce<Record<string, MenuItem[]>>((acc, item) => {
      if (!item.parentKey) {
        acc[item.key] = [];
      } else {
        if (!acc[item.parentKey]) {
          acc[item.parentKey] = [];
        }
        acc[item.parentKey].push(item);
      }
      return acc;
    }, {});

    return (
      <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/dashboard" prefetch>
                  <AppLogo />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <NavMain items={mainNavItems} />

          <SidebarGroup>
            <SidebarMenu>
              {Object.entries(menuSections).map(([sectionKey, items]) => {
                const section = menuItems.find(item => item.key === sectionKey);

                return (
                  <Collapsible
                    key={sectionKey}
                    open={openSections[sectionKey] || false}
                    onOpenChange={() => toggleSection(sectionKey)}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          {section?.icon}
                          <span>{section?.label}</span>
                          <ChevronDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            {items.map(item => (
                              <SidebarMenuSubButton
                                key={item.key}
                                asChild
                                isActive={activeItem === item.key}
                                onClick={() => setActiveItem(item.key)}
                              >
                                <Link href={item.path}>
                                  {item.icon}
                                  <span>{item.label}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            ))}
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <NavFooter items={footerNavItems} className="mt-auto" />
          <NavUser />
        </SidebarFooter>
      </Sidebar>
    );
}


