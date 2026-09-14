import { Injectable, signal, inject, computed } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { AuthUser } from '../models/auth-user';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/users';
  private readonly tokenKey = 'auth_token';
  private readonly token = signal<string | null>(localStorage.getItem(this.tokenKey));
  readonly isLoggedIn = computed(() => this.token() !== null);

  login(username: string, password: string): Observable<boolean> {
    const params = new HttpParams().set('username', username).set('password', password);
    return this.http.get<AuthUser[]>(this.apiUrl, { params }).pipe(
      map((users) => users.length > 0),
      tap((isValid) => {
        if (isValid) {
          const token = 'fake-token-123';
          localStorage.setItem(this.tokenKey, token);
          this.token.set(token);
        }
      }),
    );
  }

  getToken(): string | null {
    return this.token();
  }
  logout() {
    localStorage.removeItem(this.tokenKey);
    this.token.set(null);
  }
}
