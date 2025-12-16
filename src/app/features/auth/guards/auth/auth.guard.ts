import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const firebaseAuth = inject(Auth);
  const router = inject(Router);
  
  return authState(firebaseAuth).pipe(
    take(1),
    map(user => user ? true : router.parseUrl('/auth/login'))
  );
};
