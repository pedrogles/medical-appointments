import { ProfessionalRegistrationType } from "../types/professionalRegistration.type";
import { IPerson } from "./person.interface";

export interface IProfessional extends IPerson{
  readonly id: string;

  // Dados profissionais
  specialty: string;
  registrationType: ProfessionalRegistrationType;
  registrationNumber: string;
  registrationJurisdiction: string;

  // Controle
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}