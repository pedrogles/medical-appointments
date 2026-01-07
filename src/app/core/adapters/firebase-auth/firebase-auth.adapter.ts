import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, User, UserCredential } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthAdapter {
  private readonly auth = inject(Auth);

  login(email: string, password: string): Promise<UserCredential> {
    return this.callSignIn(email, password);
  }

  protected callSignIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register(email: string, password: string): Promise<UserCredential> {
    return this.callRegister(email, password);
  }

  protected callRegister(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  updateUserProfile(displayName: string): Promise<void> {
    return this.callUpdateProfile(displayName);
  }

  protected callUpdateProfile(displayName: string) {
    return updateProfile(this.auth.currentUser!, { displayName });
  }

  logout(): Promise<void> {
    return this.callSignOut();
  }

  protected callSignOut() {
    return signOut(this.auth);
  }
}
