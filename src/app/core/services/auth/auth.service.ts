import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router: Router = inject(Router);

  login(user: IUser): void {
    console.log(user);
    this.router.navigate(['dashboard']);
  }

  register(user: IUser): void {
    console.log(user);
    this.router.navigate(['login']);
  }

  logout(): void {
    this.router.navigate(['login']);
  }
}
