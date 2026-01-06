import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../service/auth/auth.service';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let toastService: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj<AuthService>('AuthService', [
      'register',
      'logout'
    ]);
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);
    toastService = jasmine.createSpyObj<ToastService>('ToastService', ['show']);

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, NoopAnimationsModule],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
        { provide: ToastService, useValue: toastService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form validation', () => {
    it('should be invalid when empty', () => {
      component.registerForm.reset();
      fixture.detectChanges();

      expect(component.registerForm.invalid).toBeTrue();
    });

    it('should be invalid when passwords do not match', () => {
      component.registerForm.setValue({
        username: 'user',
        email: 'user@test.com',
        password: 'Password@1',
        confirmPassword: 'Different@1'
      });
      fixture.detectChanges();

      expect(component.registerForm.invalid).toBeTrue();
      expect(component.registerForm.errors?.['passwordMismatch']).toBeTrue();
    });

    it('should be valid when all fields are correct', () => {
      component.registerForm.setValue({
        username: 'user',
        email: 'user@test.com',
        password: 'Password@1',
        confirmPassword: 'Password@1'
      });
      fixture.detectChanges();

      expect(component.registerForm.valid).toBeTrue();
    });
  });

  describe('handleRegister', () => {
    beforeEach(() => {
      component.registerForm.setValue({
        username: 'user',
        email: 'user@test.com',
        password: 'Password@1',
        confirmPassword: 'Password@1'
      });
      fixture.detectChanges();
    });

    it('should call register and logout, then redirect to login on success', () => {
      authService.register.and.returnValue(of(void 0));
      authService.logout.and.returnValue(of(void 0));

      component.handleRegister();

      expect(authService.register).toHaveBeenCalledWith({
        username: 'user',
        email: 'user@test.com',
        password: 'Password@1'
      });
      expect(authService.logout).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['auth/login']);
      expect(toastService.show).toHaveBeenCalledWith(
        'Cadastro realizado com sucesso!',
        'success'
      );
    });

    it('should show error toast on failure', () => {
      authService.register.and.returnValue(
        throwError(() => 'Erro ao cadastrar')
      );

      component.handleRegister();

      expect(toastService.show).toHaveBeenCalledWith(
        'Erro ao cadastrar',
        'error'
      );
    });

    it('should toggle loading state during request', () => {
      authService.register.and.returnValue(of(void 0));

      component.handleRegister();

      expect(component.loading).toBeFalse();
    });

    it('should not submit when form is invalid', () => {
      component.registerForm.reset();
      fixture.detectChanges();

      component.handleRegister();

      expect(authService.register).not.toHaveBeenCalled();
    });
  });

  describe('UI behavior', () => {
    it('should disable submit button when form is invalid', () => {
      component.registerForm.reset();
      fixture.detectChanges();

      const button = fixture.debugElement.query(
        By.css('button[type="submit"]')
      ).nativeElement as HTMLButtonElement;

      expect(button.disabled).toBeTrue();
    });

    it('should render spinner when loading', () => {
      component.loading = true;
      fixture.detectChanges();

      const spinner = fixture.debugElement.query(By.css('mat-spinner'));
      expect(spinner).toBeTruthy();
    });

    it('should enable submit button when form is valid', () => {
      component.registerForm.setValue({
        username: 'user',
        email: 'user@test.com',
        password: 'Password@1',
        confirmPassword: 'Password@1'
      });
      fixture.detectChanges();

      const button = fixture.debugElement.query(
        By.css('button[type="submit"]')
      ).nativeElement as HTMLButtonElement;

      expect(button.disabled).toBeFalse();
    });

    it('should navigate to login when clicking redirect link', () => {
      const link = fixture.debugElement.query(By.css('.login-redirect'));
      link.triggerEventHandler('click');
      expect(router.navigate).toHaveBeenCalledWith(['auth/login']);
    });
  });
});