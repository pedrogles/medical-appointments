import { FormControl } from "@angular/forms";
import { SexType } from "./sex.type";

export type PersonalDataFormType = {
    name: FormControl<string>;
    birth: FormControl<string>;
    cpf: FormControl<string>;
    rg: FormControl<string>;
    sex: FormControl<SexType>;
    phone: FormControl<string>;
    email: FormControl<string>;
};
