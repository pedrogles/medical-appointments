import { FormControl } from "@angular/forms";

export type AddressFormType = {
    number: FormControl<string>;
    zipCode: FormControl<string>;
    street: FormControl<string>;
    district: FormControl<string>;
    city: FormControl<string>;
    state: FormControl<string>;
};
