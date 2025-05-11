import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { from, map, take, tap } from 'rxjs';
import { Auth, authState } from '@angular/fire/auth';

export const redirectIfAuthenticated: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);
  
  return from(authState(auth).pipe(
    take(1),
    tap(user => {
      if(user) router.navigate(["app/dashboard"]);
    }),
    map(user => !user))
  )
};
