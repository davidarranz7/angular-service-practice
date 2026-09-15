export interface SessionUser {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'user';
}
