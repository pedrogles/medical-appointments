export interface IMenuItem {
    id: number;
    label: string;
    route: string;
    icon?: string;
}

export const menuItems: IMenuItem[] = [
    { id: 0, label: 'Dashboard', route: '/', icon: 'home' },
    { id: 1, label: 'Cadastro de Paciente', route: '/cadastro', icon: 'person_add' },
    { id: 2, label: 'Agendamento de Consulta', route: '/agendamento', icon: 'add_circle' },
    { id: 3, label: 'Gerenciar Pacientes/Consultas', route: '/gerenciamento', icon: 'list'}
]