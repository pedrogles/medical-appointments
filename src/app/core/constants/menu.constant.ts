import { IMenuItem } from "../interfaces/menu.interface";

export const MENU_ITEMS: IMenuItem[] = [
    { 
        id: 0, 
        label: 'Dashboard', 
        route: '/app/dashboard', 
        icon: 'home',
        type: 'link'
    },
    { 
        id: 1, 
        label: 'Adicionar Registro', 
        icon: 'person_add',
        type: 'submenu',
        children: [
            {
                label: 'Cadastrar Paciente',
                route: '/app/pacientes/novo',
            },
            {
                label: 'Cadastrar Profissional',
                route: '/app/profissionais/novo',
            }
        ]
    },
    { 
        id: 2, 
        label: 'Agendar Consulta', 
        route: '/app/agendamentos/novo', 
        icon: 'add_circle',
        type: 'link'
    },
    { 
        id: 3, 
        label: 'Gerenciar Pacientes/Consultas', 
        route: '/app/gerenciamento', 
        icon: 'list',
        type: 'link'
    }
] as const;