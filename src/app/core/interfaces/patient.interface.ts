import { SexType } from '../types/sex.type';
import { IPerson } from './person.interface';

export interface IPatient extends IPerson {
    readonly id: string;

    // Controle
    createdAt?: string;
    updatedAt?: string;
}