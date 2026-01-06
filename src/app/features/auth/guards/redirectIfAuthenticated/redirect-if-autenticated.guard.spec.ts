import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { of, Observable, from, isObservable } from 'rxjs';

import { AuthSessionAdapter } from '../../../../core/adapters/auth-session/auth-session.adapter';
import { redirectIfAutenticatedGuard } from './redirect-if-autenticated.guard';

function toObservable<T>(value: T | Promise<T> | Observable<T>): Observable<T> {
  if (isObservable(value)) {
    return value;
  }

  if (value instanceof Promise) {
    return from(value);
  }

  return of(value);
}

describe('redirectIfAutenticatedGuard', () => {
  const executeGuard: CanActivateFn = (...params) =>
    TestBed.runInInjectionContext(() =>
      redirectIfAutenticatedGuard(...params)
    );

  let router: jasmine.SpyObj<Router>;
  let authSession: jasmine.SpyObj<AuthSessionAdapter>;

  beforeEach(() => {
    router = jasmine.createSpyObj<Router>('Router', ['parseUrl']);
    authSession = jasmine.createSpyObj<AuthSessionAdapter>(
      'AuthSessionAdapter',
      ['user$']
    );

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: router },
        { provide: AuthSessionAdapter, useValue: authSession },
      ],
    });
  });

  it('should redirect to /app/dashboard when user is authenticated', (done) => {
    const urlTree = {} as UrlTree;

    authSession.user$.and.returnValue(of({ uid: '123' } as any));
    router.parseUrl.and.returnValue(urlTree);

    const result = executeGuard({} as any, {} as any);

    toObservable(result).subscribe(value => {
      expect(router.parseUrl).toHaveBeenCalledWith('/app/dashboard');
      expect(value).toBe(urlTree);
      done();
    });
  });

  it('should allow access when user is not authenticated', (done) => {
    authSession.user$.and.returnValue(of(null));

    const result = executeGuard({} as any, {} as any);

    toObservable(result).subscribe(value => {
      expect(value).toBe(true);
      done();
    });
  });
});