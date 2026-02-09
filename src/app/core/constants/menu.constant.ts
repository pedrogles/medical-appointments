import { IMenuItem } from "../interfaces/menu.interface";

export const menuItems: IMenuItem[] = [
    { 
        id: 0, 
        label: 'Dashboard', 
        route: '/app/dashboard', 
        icon: 'home',
        type: 'anchor'
    },
    { 
        id: 1, 
        label: 'Adicionar Registro', 
        icon: 'person_add',
        type: 'button',
        options: [
            {
                label: 'Cadastrar Paciente',
                route: '/app/pacientes/novo',
            }
        ]
    },
    { 
        id: 2, 
        label: 'Agendar Consulta', 
        route: '/app/agendamento', 
        icon: 'add_circle',
        type: 'anchor'
    },
    { 
        id: 3, 
        label: 'Gerenciar Pacientes/Consultas', 
        route: '/app/gerenciamento', 
        icon: 'list',
        type: 'anchor'
    }
]