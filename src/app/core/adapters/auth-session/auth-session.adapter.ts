import { inject, Injectable } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthSessionAdapter {
  private readonly firebaseAuth = inject(Auth);

  user$(): Observable<User | null> {
    return authState(this.firebaseAuth);
  }
}
