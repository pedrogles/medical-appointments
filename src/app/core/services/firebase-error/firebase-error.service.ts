import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseErrorService {

  translate(errorCode: string): string {
    const messages: Record<string, string> = {
      'auth/invalid-email': 'O e-mail informado não é válido.',
      'auth/user-disabled': 'Esta conta foi desativada. Entre em contato com o suporte.',
      'auth/user-not-found': 'Nenhuma conta foi encontrada com este e-mail.',
      'auth/wrong-password': 'A senha digitada está incorreta.',
      'auth/invalid-credential': 'As credenciais informadas são inválidas.',
      'auth/email-already-in-use': 'Este e-mail já está sendo usado em outra conta.',
      'auth/too-many-requests': 'Muitas tentativas de acesso. Tente novamente em alguns minutos.'
    };

    return messages[errorCode] ?? 'Ocorreu um erro inesperado. Tente novamente.';
  }
}