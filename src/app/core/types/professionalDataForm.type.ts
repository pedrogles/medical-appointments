import { FormControl } from "@angular/forms";
import { ProfessionalRegistrationType } from "./professionalRegistration.type";

export type ProfessionalDataFormType = {
    specialty: FormControl<string>;
    registrationType: FormControl<ProfessionalRegistrationType>;
    registrationNumber: FormControl<string>;
    registrationJurisdiction: FormControl<string>;
};