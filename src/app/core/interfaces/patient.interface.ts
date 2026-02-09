export type PatientSex = 'M' | 'F';

export interface IPatient {
    readonly id: string;
    name: string;
    birth: string;
    cpf: string;
    rg: string;
    sex: PatientSex;
    phone: string;
    email: string;
    address: {
        street: string;
        number: string;
        district: string;
        city: string;
        state: string;
        zipCode: string;
    }
}