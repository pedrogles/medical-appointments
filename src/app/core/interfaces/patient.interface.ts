export interface IPatient {
    id: string;
    name: string;
    birth: string;
    cpf: string;
    rg: string;
    sex: string;
    phone: string;
    email: string;
    address: {
        street: string;
        number: string;
        district: string;
        city: string;
        state: string;
        cep: string;
    },
    healthPlan: {
        name: string;
        code: string;
    },
    observations: string;
}