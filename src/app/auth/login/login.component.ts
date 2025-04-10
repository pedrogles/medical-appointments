import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatCardModule, 
    MatButtonModule, 
    ReactiveFormsModule,
    LogoComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  passwordPattern: RegExp = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

  loginForm = this.formBuilder.group({
    user: [null, [Validators.required, Validators.minLength(4)]],
    password: [null, [Validators.required, Validators.pattern(this.passwordPattern)]]
  })

  onSubmit(): void {
    if(this.loginForm.valid) {
      // console.log(this.loginForm.value)
      this.router.navigate(['/dashboard'])
    }    
  }
}
