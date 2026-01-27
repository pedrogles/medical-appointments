import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthLayoutComponent } from '../../layout/auth-layout/auth-layout.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth/auth.service';
import { finalize, switchMap } from 'rxjs';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { REGEX } from '../../../../core/constants/regex.constant';
import { passwordMatchValidator } from '../../../../core/validators/password-match.validator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RegisterDTO } from '../../dtos/register.dto';

@Component({
  selector: 'medical-register',
  standalone: true,
  imports: [
      FormsModule,
      CommonModule, 
      MatFormFieldModule, 
      MatInputModule, 
      MatCardModule, 
      MatButtonModule, 
      ReactiveFormsModule,
      AuthLayoutComponent,
      MatProgressSpinnerModule
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  loading = false;
  registerForm = this.formBuilder.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(REGEX.password)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: passwordMatchValidator('password', 'confirmPassword') });

  handleRegister(): void {
    // if(this.registerForm.valid) {
    //   const { username, email, password } = this.registerForm.getRawValue();
    //   const user: RegisterDTO = { username, email, password };
    //   this.loading = true;
    //    this.authService.register(user)
    //     .pipe(
    //       switchMap(() => this.authService.logout()),
    //       finalize(() => this.loading = false))
    //     .subscribe({
    //     next: () => {
    //       this.handleRedirect('login');
    //       this.toastService.show('Cadastro realizado com sucesso!', 'success');
    //     },
    //     error: (errorMessage: string) => {
    //       this.toastService.show(errorMessage, 'error');
    //     }
    //   });
    // }    

    this.handleRedirect('login');
    this.toastService.show('Cadastro realizado com sucesso!', 'success');
  }

  handleRedirect(page: string): void {
    switch(page) {
      case 'login':
        this.router.navigate(["auth/login"]);
        break;
    }
  }

  get formControls() {
    return this.registerForm.controls;
  }
}