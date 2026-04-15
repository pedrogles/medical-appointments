import { FormControl } from "@angular/forms";

export type RegisterFormType = {
    username: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
}