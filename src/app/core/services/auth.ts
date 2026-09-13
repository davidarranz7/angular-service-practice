import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly storageKey = 'auth_session';

  private readonly loggeIn = signal(localStorage.getItem(this.storageKey) === 'true');

  readonly isLoggedIn = this.loggeIn.asReadonly();

  login() {
    localStorage.setItem(this.storageKey, 'true');
    this.loggeIn.set(true);
  }

  logout() {
    localStorage.removeItem(this.storageKey);
    this.loggeIn.set(false);
  }
}
