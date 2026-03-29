import { FormControl } from "@angular/forms";

export type LoginFormType = {
  email: FormControl<string>;
  password: FormControl<string>;
}