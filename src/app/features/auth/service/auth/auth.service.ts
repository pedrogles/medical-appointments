import { inject, Injectable } from '@angular/core';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import { FirebaseErrorService } from '../../../../core/services/firebase-error/firebase-error.service';
import { LoginDTO } from '../../dtos/login.dto';
import { RegisterDTO } from '../../dtos/register.dto';
import { FirebaseAuthAdapter } from '../../../../core/adapters/firebase-auth/firebase-auth.adapter';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly firebaseAuthAdapter = inject(FirebaseAuthAdapter);
  private readonly firebaseError = inject(FirebaseErrorService);

  login(user: LoginDTO): Observable<void> {
    return from(this.firebaseAuthAdapter.login(user.email, user.password)).pipe(
      map(() => void 0),
      catchError((error) => throwError(() => this.firebaseError.translate(error.code)))
    );
  }

  register(user: RegisterDTO): Observable<void> {
    return from(this.firebaseAuthAdapter.register(user.email, user.password)).pipe(
      switchMap(() => 
        from(this.firebaseAuthAdapter.updateUserProfile(user.username))),
      map(() => void 0),
      catchError((error) => throwError(() => this.firebaseError.translate(error.code)))
    );
  }

  logout(): Observable<void> {
    return from(this.firebaseAuthAdapter.logout()).pipe(
      map(() => void 0),
      catchError(() => 
        throwError(() => "Erro ao realizar logout. Tente novamente."))
    );
  }
}
