export interface IMenuItem {
    label: string;
    route: string;
    icon?: string;
}

export const menuItems: IMenuItem[] = [
    { label: 'Dashboard', route: '/', icon: 'home' },
    { label: 'Cadastro de Paciente', route: '/', icon: 'person_add' },
    { label: 'Agendamento de Consulta', route: '/', icon: 'add_circle' },
    { label: 'Gerenciar Pacientes/Consultas', route: '/', icon: 'list'}
]