import { MenuItemType, MenuSubItem } from '../types/menu.type';

export interface IMenuItem {
    id: number;
    label: string;
    route?: string;
    icon?: string;
    type: MenuItemType;
    children?: MenuSubItem[];
}