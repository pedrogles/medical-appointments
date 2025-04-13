import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router: Router = inject(Router);

  login(user: IUser): void {
    // console.log(user);
    this.router.navigate(['dashboard']);
  }

  logout() {
    this.router.navigate(['login']);
  }
}
