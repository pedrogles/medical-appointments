import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthLayoutComponent } from '../../../layout/auth-layout/auth-layout.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IUser } from '../../../core/interfaces/user.interface';
import { passwordMatchValidator } from '../../../shared/validators/passwordMatch.validator';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { finalize, switchMap } from 'rxjs';

@Component({
  selector: 'app-register',
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
      RouterLink,
      SpinnerComponent
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private passwordPattern: RegExp = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loading = false;
  registerForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
    confirmPassword: ['', [Validators.required, Validators.pattern(this.passwordPattern)]]
  }, { validators: passwordMatchValidator('password', 'confirmPassword') });

  onSubmit(): void {
    if(this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      const user = { username, email, password } as IUser;
       this.loading = true;
       this.authService.register(user)
        .pipe(
          switchMap(() => this.authService.logout()),
          finalize(() => this.loading = false))
        .subscribe({
        next: () => {
          // Inserir toast de confirmação de cadastro.
          this.handleRedirectToLogin();
        },
        error: (error) => {
          // Inserir toast de erro.
          console.error(error)
        }
      });
    }    
  }

  handleRedirectToLogin(): void {
    this.router.navigate(["auth/login"]);
  }

  get formControls() {
    return this.registerForm.controls;
  }
}
