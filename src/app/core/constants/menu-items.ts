import { RouterLink } from "@angular/router";
import { MenuItem } from "primeng/api";

export const menuItems: MenuItem[] = [
    {
        label: 'INICIO',
        icon: 'pi pi-fw pi-home',
        routerLink: '/'
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
                label: 'Gestión Asignaturas',
                icon: 'pi pi-fw pi-clone',
                routerLink:'/gestion-asignaturas',
            },
            {
                label: 'Gestión Documento',
                icon: 'pi pi-fw pi-clone',
                routerLink:'/gestion-documentos',
            }
        ]
    },
    {
        label: 'MATRICULAS',
        icon: 'pi pi-fw pi-id-card',
    },
    {
        label: 'SOLICITUDES',
        icon: 'pi pi-fw pi-inbox',

    },
    {
        label: 'PRESUPUESTO',
        icon: 'pi pi-fw pi-chart-line'
    },
    { separator: true },
    {
        label: 'TRABAJOS DE GRADO',
        icon: 'pi pi-fw pi-book'
    }
];
