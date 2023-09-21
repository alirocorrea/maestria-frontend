import { MenuItem } from 'primeng/api';

export const menuItems: MenuItem[] = [
    {
        label: 'INICO',
        icon: 'pi pi-fw pi-home',
        routerLink: '/',
    },
    {
        label: 'GESTIÓN',
        icon: 'pi pi-fw pi-user',
        items: [
            {
                label: 'Gestion Estudiantes',
                icon: 'pi pi-fw pi-list',
                routerLink: '/estudiantes',
            },
            {
                label: 'Solicitudes',
                icon: 'pi pi-fw pi-inbox',
                routerLink: '/gestionsolicitudes',
            },
            {
                label: 'Opcion 2',
                icon: 'pi pi-fw pi-search',
            },
        ],
    },
    {
        label: 'MATRICULAS',
        icon: 'pi pi-fw pi-id-card',
    },
    {
        label: 'SOLICITUDES',
        icon: 'pi pi-fw pi-inbox',
        routerLink: '/gestionsolicitudes/creacion/selector',
    },
    {
        label: 'PRESUPUESTO',
        icon: 'pi pi-fw pi-chart-line',
    },
    { separator: true },
    {
        label: 'TRABAJOS DE GRADO',
        icon: 'pi pi-fw pi-book',
    },
];
