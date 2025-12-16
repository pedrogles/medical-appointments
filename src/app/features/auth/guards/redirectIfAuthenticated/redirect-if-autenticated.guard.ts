import { inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { from, map, take, tap } from 'rxjs';

export const redirectIfAutenticatedGuard: CanActivateFn = (route, state) => {
  const firebaseAuth = inject(Auth);
  const router = inject(Router);
  
  return authState(firebaseAuth).pipe(
    take(1),
    map(user => user ? router.parseUrl('/app/dashboard') : true)
  );
};
