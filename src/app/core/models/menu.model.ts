export interface IMenuItem {
    label: string;
    route: string;
    icon?: string;
}

export const menuItems: IMenuItem[] = [
    { label: 'Agendamento de Consulta', route: '/' },
    { label: 'Cadastro de Paciente', route: '/' },
    { label: 'Lista de Pacientes', route: '/' },
    { label: 'Lista de Consultas', route: '/' }
]