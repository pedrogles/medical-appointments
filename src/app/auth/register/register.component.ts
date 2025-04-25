import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthLayoutComponent } from '../../layout/auth-layout/auth-layout.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IUser } from '../../core/interfaces/user.interface';
import { passwordMatchValidator } from '../../shared/validators/passwordMatch.validator';

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
      RouterLink
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);
  passwordPattern: RegExp = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

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
      this.authService.register(user);
    }    
  }

  get formControls() {
    return this.registerForm.controls;
  }
}
