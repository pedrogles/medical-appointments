import { SexType } from "../types/sex.type";
import { IAddress } from "./address.interface";

export interface IPerson {
    name: string;
    birth: string;
    cpf: string;
    rg: string;
    sex: SexType;

    // Contato
    phone: string;
    email: string;

    // Endereço
    address: IAddress
}