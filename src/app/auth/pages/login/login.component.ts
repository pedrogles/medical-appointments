import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../../core/interfaces/user.interface';
import { AuthLayoutComponent } from '../../../layout/auth-layout/auth-layout.component';
import { Router, RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    ReactiveFormsModule,
    AuthLayoutComponent,
    RouterLink,
    SpinnerComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private passwordPattern: RegExp = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  
  loading = false;
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]]
  })

  onSubmit(): void {
    if(this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const user = { email, password } as IUser;
      this.loading = true;
      this.authService.login(user)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          // Adicionar toast de sucesso de login
          this.router.navigate(["app/dashboard"]);
        },
        error: (error) => {
          // Adicionar toast de erro de login
          console.log(error)
        }
      })
    }    
  }

  handleRedirectToRegister(): void {
    this.router.navigate(["auth/register"]);
  }

  get formControls() {
    return this.loginForm.controls;
  }
}
