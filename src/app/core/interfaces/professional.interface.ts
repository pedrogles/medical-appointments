import { ProfessionalRegistrationType } from "../types/professionalRegistration.type";
import { SexType } from "../types/sex.type";

export interface IProfessional {
  readonly id: string;

  // Dados pessoais
  name: string;
  birth: string;
  cpf: string;
  rg: string;
  sex: SexType;

  // Contato
  phone: string;
  email: string;

  // Endereço
  address: {
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
    zipCode: string;
  };

  // Dados profissionais
  specialty: string;
  registrationType: ProfessionalRegistrationType;
  registrationNumber: string;

  // Controle
  isActive: boolean;
//   createdAt?: string;
//   updatedAt?: string;
}