export interface AuthUser {
  id: string;
  username: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
}
