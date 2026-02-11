import { SexType } from "../../../../../core/types/sex.type";

export interface CreatePatientDTO {
    name: string;
    birth: string;
    cpf: string;
    rg: string;
    sex: SexType;
    phone: string;
    email: string;
    address: {
        street: string;
        number: string;
        district: string;
        city: string;
        state: string;
        zip_code: string;
    }
}