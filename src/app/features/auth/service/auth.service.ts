import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, UserCredential } from '@angular/fire/auth';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import { IUser } from '../../../core/interfaces/user.interface';
import { FirebaseErrorService } from '../../../core/services/firebase-error/firebase-error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly firebaseAuth = inject(Auth);
  private readonly firebaseError = inject(FirebaseErrorService);

  login(user: IUser): Observable<void> {
    return from(signInWithEmailAndPassword(this.firebaseAuth, user.email, user.password)).pipe(
      map(() => void 0),
      catchError((error) => throwError(() => this.firebaseError.translate(error.code)))
    );
  }

  register(user: IUser): Observable<void> {
    return from(createUserWithEmailAndPassword(this.firebaseAuth, user.email, user.password)).pipe(
      switchMap((response: UserCredential) => from(updateProfile(response.user, { displayName: user.username }))),
      map(() => void 0),
      catchError((error) => throwError(() => this.firebaseError.translate(error.code)))
    );
  }

  logout(): Observable<void> {
    return from(signOut(this.firebaseAuth)).pipe(
      map(() => void 0),
      catchError((error) => throwError(() => "Erro ao realizar logout. Tente novamente."))
    );
  }
}
