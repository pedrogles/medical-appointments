import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';
import { AuthSessionAdapter } from '../../../../core/adapters/auth-session/auth-session.adapter';

export const authGuard: CanActivateFn = (route, state) => {
  const authSession = inject(AuthSessionAdapter);
  const router = inject(Router);
  
  // return authSession.user$().pipe(
  //   take(1),
  //   map(user => user ? true : router.parseUrl('/auth/login'))
  // );
  
  return true;
};
