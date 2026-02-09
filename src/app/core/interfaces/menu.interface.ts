type MenuType = 'anchor' | 'button';

type MenuOption = {
    label: string;
    route: string;
};

export interface IMenuItem {
    id: number;
    label: string;
    route?: string;
    icon?: string;
    type: MenuType;
    options?: MenuOption[];
}