import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { IUser } from '../../core/interfaces/user.interface';
import { AuthLayoutComponent } from '../../layout/auth-layout/auth-layout.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    ReactiveFormsModule,
    AuthLayoutComponent,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);
  passwordPattern: RegExp = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

  loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]]
  })

  onSubmit(): void {
    if(this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const user = { username, password } as IUser;
      this.authService.login(user);
    }    
  }
}
