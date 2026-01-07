import { TestBed } from '@angular/core/testing';
import { FirebaseAuthAdapter } from './firebase-auth.adapter';
import { Auth, UserCredential, User } from '@angular/fire/auth';

describe('FirebaseAuthAdapter', () => {
  let adapter: FirebaseAuthAdapter;
  let authMock: jasmine.SpyObj<Auth>;

  const mockUser: Partial<User> = {
    uid: '123',
    displayName: 'Pedro',
    email: 'pedro@test.com',
    emailVerified: true,
    isAnonymous: false,
    metadata: {} as any,
    phoneNumber: null,
    photoURL: null,
    providerData: [],
    refreshToken: 'token',
    tenantId: null,
    delete: jasmine.createSpy('delete'),
    getIdToken: jasmine.createSpy('getIdToken'),
    getIdTokenResult: jasmine.createSpy('getIdTokenResult'),
    reload: jasmine.createSpy('reload'),
    toJSON: jasmine.createSpy('toJSON')
  };

  const mockUserCredential: UserCredential = { user: mockUser as User } as UserCredential;

  beforeEach(() => {
    authMock = jasmine.createSpyObj('Auth', [], { currentUser: mockUser as User });

    TestBed.configureTestingModule({
      providers: [
        FirebaseAuthAdapter,
        { provide: Auth, useValue: authMock }
      ]
    });

    adapter = TestBed.inject(FirebaseAuthAdapter);
  });

  it('should be created', () => {
    expect(adapter).toBeTruthy();
  });

  describe('login', () => {
    it('login should call callSignIn with email and password', async () => {
      spyOn(adapter as any, 'callSignIn').and.returnValue(Promise.resolve(mockUserCredential));

      const result = await adapter.login('test@test.com', '123456');

      expect((adapter as any).callSignIn).toHaveBeenCalledWith('test@test.com', '123456');
      expect(result).toBe(mockUserCredential);
    });
  });

  describe('register', () => {
    it('register should call callRegister with email and password', async () => {
      spyOn(adapter as any, 'callRegister').and.returnValue(Promise.resolve(mockUserCredential));

      const result = await adapter.register('test@test.com', '123456');
      
      expect((adapter as any).callRegister).toHaveBeenCalledWith('test@test.com', '123456');
      expect(result).toBe(mockUserCredential);
    });

    it('updateUserProfile should call callUpdateProfile with displayName', async () => {
      spyOn(adapter as any, 'callUpdateProfile').and.returnValue(Promise.resolve());
  
      await adapter.updateUserProfile('Pedro');
      expect((adapter as any).callUpdateProfile).toHaveBeenCalledWith('Pedro');
    });
  });

  describe('logout', () => {
    it('logout should call callSignOut', async () => {
      spyOn(adapter as any, 'callSignOut').and.returnValue(Promise.resolve());

      await adapter.logout();
      expect((adapter as any).callSignOut).toHaveBeenCalled();
    });
  });
});