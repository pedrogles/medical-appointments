import { TestBed } from '@angular/core/testing';

import { FirebaseErrorService } from './firebase-error.service';

describe('FirebaseErrorService', () => {
  let service: FirebaseErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('translate', () => {
    const errorCases: Array<[string, string]> = [
      ['auth/invalid-email', 'O e-mail informado não é válido.'],
      ['auth/user-disabled', 'Esta conta foi desativada. Entre em contato com o suporte.'],
      ['auth/user-not-found', 'Nenhuma conta foi encontrada com este e-mail.'],
      ['auth/wrong-password', 'A senha digitada está incorreta.'],
      ['auth/invalid-credential', 'As credenciais informadas são inválidas.'],
      ['auth/email-already-in-use', 'Este e-mail já está sendo usado em outra conta.'],
      ['auth/too-many-requests', 'Muitas tentativas de acesso. Tente novamente em alguns minutos.']
    ];

    errorCases.forEach(([errorCode, expectedMessage]) => {
      it(`should translate ${errorCode}`, () => {
        const result = service.translate(errorCode);
        expect(result).toBe(expectedMessage);
      });
    });

    it('should return default message for unknown error codes', () => {
      const result = service.translate('auth/unknown-error');
      expect(result).toBe('Ocorreu um erro inesperado. Tente novamente.');
    });
  });
});
