import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { from, isObservable, Observable, of } from 'rxjs';

import { authGuard } from './auth.guard';
import { AuthSessionAdapter } from '../../../../core/adapters/auth-session/auth-session.adapter';

function toObservable<T>(value: T | Promise<T> | Observable<T>): Observable<T> {
  if (isObservable(value)) {
    return value;
  }

  if (value instanceof Promise) {
    return from(value);
  }

  return of(value);
}

describe('authGuard', () => {

  const executeGuard: CanActivateFn = (...params) =>
    TestBed.runInInjectionContext(() => authGuard(...params));

  let router: jasmine.SpyObj<Router>;
  let authSession: jasmine.SpyObj<AuthSessionAdapter>;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['parseUrl']);
    authSession = jasmine.createSpyObj<AuthSessionAdapter>('AuthSessionAdapter', [
      'user$',
    ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: router },
        { provide: AuthSessionAdapter, useValue: authSession },
      ],
    });
  });

  it('should allow access when user is authenticated', (done) => {
    authSession.user$.and.returnValue(of({ uid: '123' } as any));

    const result = executeGuard({} as any, {} as any);

    toObservable(result).subscribe(value => {
      expect(value).toBe(true);
      done();
    });
  });

  it('should redirect to /auth/login when user is not authenticated', (done) => {
    const urlTree = {} as UrlTree;
    router.parseUrl.and.returnValue(urlTree);
    authSession.user$.and.returnValue(of(null));

    const result = executeGuard({} as any, {} as any);

    toObservable(result).subscribe(value => {
      expect(router.parseUrl).toHaveBeenCalledWith('/auth/login');
      expect(value).toBe(urlTree);
      done();
    });
  });
});