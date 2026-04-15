import { IMenuItem } from "../interfaces/menu.interface";

export const MENU_ITEMS: IMenuItem[] = [
    { 
        key: 'dashboard',
        label: 'Dashboard', 
        route: '/app/dashboard', 
        icon: 'home',
        type: 'link'
    },
    { 
        key: 'cadastros',
        label: 'Cadastros', 
        icon: 'group_add',
        type: 'submenu',
        children: [
            {
                label: 'Novo Paciente',
                route: '/app/pacientes/novo',
            },
            {
                label: 'Novo Profissional',
                route: '/app/profissionais/novo',
            }
        ]
    },
    { 
        key: 'agendamentos',
        label: 'Agendamentos', 
        route: '/app/agendamentos/novo', 
        icon: 'event',
        type: 'link'
    },
    { 
        key: 'gestao',
        label: 'Gestão', 
        icon: 'admin_panel_settings',
        type: 'submenu',
    }
] as const;