import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { AuthUser } from '../models/auth-user';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/users';
  private readonly storageKey = 'auth_session';
  private readonly loggeIn = signal(localStorage.getItem(this.storageKey) === 'true');
  readonly isLoggedIn = this.loggeIn.asReadonly();

  login(username: string, password: string): Observable<boolean> {
    const params = new HttpParams().set('username', username).set('password', password);
    return this.http.get<AuthUser[]>(this.apiUrl, { params }).pipe(
      map((users) => users.length > 0),
      tap((isValid) => {
        if (isValid) {
          localStorage.setItem(this.storageKey, 'true');
          this.loggeIn.set(true);
        }
      }),
    );
  }

  logout() {
    localStorage.removeItem(this.storageKey);
    this.loggeIn.set(false);
  }
}
