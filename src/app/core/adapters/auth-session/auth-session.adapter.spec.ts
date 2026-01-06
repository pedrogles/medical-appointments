import { TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';

import { AuthSessionAdapter } from './auth-session.adapter';

describe('AuthSessionAdapter', () => {
  let service: AuthSessionAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Auth,
          useValue: {},
        },
      ],
    });

    service = TestBed.inject(AuthSessionAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose a user$ method', () => {
    expect(service.user$).toBeDefined();
    expect(typeof service.user$).toBe('function');
  });
});