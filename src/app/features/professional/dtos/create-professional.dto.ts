import { ProfessionalRegistrationType } from "../../../core/types/professionalRegistration.type";
import { SexType } from "../../../core/types/sex.type";

export interface CreateProfessionalDTO {
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
    };
    specialty: string;
    registration_type: ProfessionalRegistrationType;
    registration_jurisdiction: string;
    registration_number: string;
}