import { FormControl } from "@angular/forms";
import { IPatient } from "../interfaces/patient.interface";
import { IProfessional } from "../interfaces/professional.interface";

export type AppointmentFormType = {
    patient: FormControl<IPatient | null>;
    professional: FormControl<IProfessional | null>;
    date: FormControl<string>;
    hour: FormControl<string>;
    notes: FormControl<string>;
}