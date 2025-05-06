import { AbstractControl, ValidationErrors } from "@angular/forms";

export function cpfValidator(control: AbstractControl): ValidationErrors | null {
  const cpf = control.value;

  if (!cpf) {
    return null;
  }

  const cleaned = cpf.replace(/\D/g, '');

  if (cleaned.length !== 11 || /^(\d)\1{10}$/.test(cleaned)) {
    return { cpfDismatch: true };
  }

  const calcCheckDigit = (length: number) => {
    let sum = 0;
    for (let i = 0; i < length; i++) {
      sum += parseInt(cleaned.charAt(i)) * (length + 1 - i);
    }
    const remainder = (sum * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };

  const digit1 = calcCheckDigit(9);
  const digit2 = calcCheckDigit(10);

  if (digit1 !== parseInt(cleaned.charAt(9)) || digit2 !== parseInt(cleaned.charAt(10))) {
    return { cpfDismatch: true };
  }

  return null; 
}
