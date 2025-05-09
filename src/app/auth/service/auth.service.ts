import { inject, Injectable } from '@angular/core';
import { IUser } from '../../core/interfaces/user.interface';
import { from, Observable } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { updateProfile } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly fireBaseAuth = inject(Auth);

  login(user: IUser): Observable<void> {
    const promise = signInWithEmailAndPassword(this.fireBaseAuth, user.email, user.password)
      .then((response) => console.log(response));
      return from(promise);
  }

  register(user: IUser): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.fireBaseAuth, user.email, user.password)
      .then((response) => updateProfile(response.user, { displayName: user.username}));
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.fireBaseAuth);
    return from(promise);
  }
}
