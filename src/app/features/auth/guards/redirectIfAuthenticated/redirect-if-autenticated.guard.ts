import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthSessionAdapter } from '../../../../core/adapters/auth-session/auth-session.adapter';

export const redirectIfAutenticatedGuard: CanActivateFn = (route, state) => {
  const authSession = inject(AuthSessionAdapter);
  const router = inject(Router);
  
  // return authSession.user$().pipe(
  //   take(1),
  //   map(user => user ? router.parseUrl('/app/dashboard') : true)
  // );

  return true;
};
