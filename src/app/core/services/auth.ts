import { Injectable, signal, inject, computed } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { AuthUser } from '../models/auth-user';
import { SessionUser } from '../models/session-user';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/users';
  private readonly tokenKey = 'auth_token';
  private readonly token = signal<string | null>(localStorage.getItem(this.tokenKey));
  private readonly currentUserSignal = signal<SessionUser | null>(null);
  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isLoggedIn = computed(() => this.token() !== null);

  login(username: string, password: string): Observable<boolean> {
    const params = new HttpParams().set('username', username).set('password', password);
    return this.http.get<AuthUser[]>(this.apiUrl, { params }).pipe(
      tap((users) => {
        const user = users[0];
        if (user) {
          const sessionUser: SessionUser = {
            id: user.id,
            username: user.username,
            name: user.name,
            role: user.role,
          };
          this.currentUserSignal.set(sessionUser);
          const token = 'fake-token-123';
          localStorage.setItem(this.tokenKey, token);
          this.token.set(token);
        }
      }),
      map((users) => users.length > 0),
    );
  }

  getToken(): string | null {
    return this.token();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.token.set(null);
    this.currentUserSignal.set(null);
  }
}
