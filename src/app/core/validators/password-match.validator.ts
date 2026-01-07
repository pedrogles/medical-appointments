import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatchValidator(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const passwordControl = formGroup.get(passwordKey);
    const confirmPasswordControl = formGroup.get(confirmPasswordKey);

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    // Senhas diferentes
    if (password !== confirmPassword) {
      confirmPasswordControl.setErrors({
        ...confirmPasswordControl.errors,
        passwordMismatch: true
      });
      return { passwordMismatch: true };
    }

    // Remove apenas o erro passwordMismatch, mantendo os demais
    if (confirmPasswordControl.errors) {
      const { passwordMismatch, ...otherErrors } = confirmPasswordControl.errors;
      confirmPasswordControl.setErrors(
        Object.keys(otherErrors).length ? otherErrors : null
      );
    }

    return null;
  };
}