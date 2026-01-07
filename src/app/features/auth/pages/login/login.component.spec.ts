import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../service/auth/auth.service';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let toastService: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['login']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    toastService = jasmine.createSpyObj('ToastService', ['show']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, NoopAnimationsModule],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
        { provide: ToastService, useValue: toastService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form validation', () => {
    it('should be invalid when empty', () => {
      component.loginForm.reset();
      fixture.detectChanges();

      expect(component.loginForm.invalid).toBeTrue();
    });

    it('should validate email and password correctly', () => {
      component.loginForm.setValue({
        email: 'test@email.com',
        password: 'Senha@123'
      });

      expect(component.loginForm.valid).toBeTrue();
    });
  });

  describe('handleLogin', () => {
    beforeEach(() => {
      component.loginForm.setValue({
        email: 'test@email.com',
        password: 'Senha@123'
      });
    });

    it('should call AuthService.login when form is valid', () => {
      authService.login.and.returnValue(of(void 0));

      component.handleLogin();

      expect(authService.login).toHaveBeenCalledWith({
        email: 'test@email.com',
        password: 'Senha@123'
      });
    });

    it('should show success toast and redirect on success', () => {
      authService.login.and.returnValue(of(void 0));

      component.handleLogin();

      expect(router.navigate).toHaveBeenCalledWith(['app/dashboard']);
      expect(toastService.show).toHaveBeenCalledWith(
        'Login realizado com sucesso!',
        'success'
      );
    });

    it('should show error toast on failure', () => {
      authService.login.and.returnValue(
        throwError(() => 'Credenciais inválidas')
      );

      component.handleLogin();

      expect(toastService.show).toHaveBeenCalledWith(
        'Credenciais inválidas',
        'error'
      );
    });

    it('should toggle loading state during request', () => {
      authService.login.and.returnValue(of(void 0));

      component.handleLogin();
      expect(component.loading).toBeFalse();
    });

    it('should not submit when form is invalid', () => {
      component.loginForm.reset();
      fixture.detectChanges();

      component.handleLogin();

      expect(authService.login).not.toHaveBeenCalled();
    });
  });

  describe('UI behavior', () => {
    it('should disable submit button when form is invalid', () => {
      component.loginForm.reset();
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
      component.loginForm.setValue({
        email: 'test@email.com',
        password: 'Senha@123'
      });
      fixture.detectChanges();

      const button = fixture.debugElement.query(
        By.css('button[type="submit"]')
      ).nativeElement as HTMLButtonElement;

      expect(button.disabled).toBeFalse();
    });

    it('should navigate to register when clicking redirect link', () => {
      const link = fixture.debugElement.query(By.css('.register-redirect'));
      link.triggerEventHandler('click');
      expect(router.navigate).toHaveBeenCalledWith(['auth/register']);
    });
  });
});