import { IMenuItem } from "../interfaces/menu.interface";

export const menuItems: IMenuItem[] = [
    { id: 0, label: 'Dashboard', route: '/app/dashboard', icon: 'home' },
    { id: 1, label: 'Cadastro de Paciente', route: '/app/cadastro-de-paciente', icon: 'person_add' },
    { id: 2, label: 'Agendamento de Consulta', route: '/app/agendamento', icon: 'add_circle' },
    { id: 3, label: 'Gerenciar Pacientes/Consultas', route: '/app/gerenciamento', icon: 'list'}
]