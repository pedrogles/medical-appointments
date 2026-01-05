import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { FirebaseErrorService } from '../../../core/services/firebase-error/firebase-error.service';
import { LoginDTO } from '../dtos/login.dto';
import { RegisterDTO } from '../dtos/register.dto';
import * as firebaseAuth from 'firebase/auth';
import { FirebaseAuthAdapter } from '../../../core/adapters/firebase-auth-adapter/firebase-auth-adapter';

describe('AuthService', () => {
  let service: AuthService;
  let authAdapterSpy: jasmine.SpyObj<FirebaseAuthAdapter>;
  let firebaseErrorSpy: jasmine.SpyObj<FirebaseErrorService>;

  const mockLogin: LoginDTO = {
    email: 'test@email.com',
    password: '123456'
  };

  const mockRegister: RegisterDTO = {
    email: 'test@email.com',
    password: '123456',
    username: 'Pedro'
  };

  function mockUserCredential(): firebaseAuth.UserCredential {
    return { user: {} as any } as firebaseAuth.UserCredential;
  }

  beforeEach(() => {
    authAdapterSpy = jasmine.createSpyObj('FirebaseAuthAdapter', [
      'login',
      'register',
      'updateUserProfile',
      'logout'
    ]);

    firebaseErrorSpy = jasmine.createSpyObj('FirebaseErrorService', [
      'translate'
    ]);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: FirebaseAuthAdapter, useValue: authAdapterSpy },
        { provide: FirebaseErrorService, useValue: firebaseErrorSpy }
      ]
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should login successfully', (done) => {
      authAdapterSpy.login.and.returnValue(Promise.resolve(mockUserCredential()));

      service.login(mockLogin).subscribe({
        next: () => {
          expect(authAdapterSpy.login).toHaveBeenCalledWith(mockLogin.email, mockLogin.password);
          done();
        }
     });
    });

    it('should translate firebase error on login failure', (done) => {
      firebaseErrorSpy.translate.and.returnValue('Email inválido');
      authAdapterSpy.login.and.returnValue(
        Promise.reject({ code: 'auth/invalid-email' })
      );

      service.login(mockLogin).subscribe({
        error: (error) => {
          expect(firebaseErrorSpy.translate).toHaveBeenCalledWith('auth/invalid-email');
          expect(error).toBe('Email inválido');
          done();
        }
      });
    });
  });

  describe('register', () => {
    it('should register and update profile successfully', (done) => {
      authAdapterSpy.register.and.returnValue(Promise.resolve(mockUserCredential()));
      authAdapterSpy.updateUserProfile.and.returnValue(Promise.resolve());

      service.register(mockRegister).subscribe({
        next: () => {
          expect(authAdapterSpy.register).toHaveBeenCalledWith(mockRegister.email, mockRegister.password);
          expect(authAdapterSpy.updateUserProfile).toHaveBeenCalledWith(mockRegister.username);
          done();
        },
        error: done.fail
      });
    });

    it('should translate firebase error on register failure', (done) => {
      firebaseErrorSpy.translate.and.returnValue('Este e-mail já está sendo usado em outra conta.');
      authAdapterSpy.register.and.returnValue(
        Promise.reject({ code: 'auth/email-already-in-use' })
      );

      service.register(mockRegister).subscribe({
        error: (error) => {
          expect(firebaseErrorSpy.translate).toHaveBeenCalledWith('auth/email-already-in-use');
          expect(error).toBe('Este e-mail já está sendo usado em outra conta.');
          done();
        }
      });
    });
  });

  describe('logout', () => {
    it('should logout successfully', (done) => {
      authAdapterSpy.logout.and.returnValue(Promise.resolve());

      service.logout().subscribe({
        next: () => {
          expect(authAdapterSpy.logout).toHaveBeenCalled();
          done();
        }
      });
    });

    it('should return generic error message on logout failure', (done) => {
      authAdapterSpy.logout.and.returnValue(Promise.reject());

      service.logout().subscribe({
        error: (error) => {
          expect(error).toBe('Erro ao realizar logout. Tente novamente.');
          done();
        }
      });
    });
  });
});
