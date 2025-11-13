import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { IUser } from '../../../core/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly firebaseAuth = inject(Auth);

  login(user: IUser): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, user.email, user.password)
      .then(async (response) => {
        try {
          const accessToken = await response.user.getIdToken(true);
          localStorage.setItem("accessToken", accessToken);
        } catch(tokenError) {
          console.error("Erro ao obter Token: ", tokenError)
        }
      })
      .catch((error) => {
        console.error("Erro ao fazer login: ", error)
        throw error
      })
      return from(promise);
  }

  register(user: IUser): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, user.email, user.password)
      .then(async (response) => {
        await updateProfile(response.user, { displayName: user.username});
      })
      .catch((error) => {
        console.error("Erro ao cadastrar novo usuário: ", error)
        throw error
      })
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth)
      .then(() => localStorage.removeItem("accessToken"))
      .catch((error) => {
        console.error("Erro ao realizar logout: ", error)
        throw error
      })
    return from(promise);
  }
}
