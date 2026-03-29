import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { REGEX } from '../../../../core/constants/regex.constant';
import { finalize } from 'rxjs';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { LoginDTO } from '../../dtos/login.dto';
import { AuthLayoutComponent } from '../../layout/auth-layout/auth-layout.component';
import { LoginFormType } from '../../../appointment/types/login.type';

@Component({
  selector: 'medical-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    ReactiveFormsModule,
    AuthLayoutComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);
  
  loading: boolean = false;
  loginForm = this.formBuilder.nonNullable.group<LoginFormType>({
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.pattern(REGEX.password)] })
  })

  handleLogin(): void {
    if(this.loginForm.valid) {
      const user : LoginDTO = this.loginForm.getRawValue();
      this.loading = true;
      this.authService.login(user)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.handleRedirect('dashboard');
          this.toastService.show('Login realizado com sucesso!', 'success');
        },
        error: (errorMessage: string) => {
          this.toastService.show(errorMessage, 'error');
        }
      })
    }     
  }

  handleRedirect(page: string): void {
    switch(page) {
      case 'dashboard':
        this.router.navigate(["app/dashboard"]);
        break;
      case 'register':
        this.router.navigate(["auth/register"]);
        break;
    }
  }

  get formControls() {
    return this.loginForm.controls;
  }
}