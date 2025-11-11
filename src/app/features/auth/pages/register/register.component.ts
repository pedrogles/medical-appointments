import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthLayoutComponent } from '../../layout/auth-layout/auth-layout.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);

  loading = false;
  registerForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  });

  handleRegister(): void {
    if(this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
       console.log(`username: ${username}, email: ${email}, senha:${password}`)
    }    
  }

  handleRedirectToLogin(): void {
    this.router.navigate(["auth/login"]);
  }

  get formControls() {
    return this.registerForm.controls;
  }
}