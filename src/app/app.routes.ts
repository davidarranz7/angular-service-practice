import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { UserDetail } from './pages/user-detail/user-detail';
import { Home } from './pages/home/home';
import { Contact } from './pages/contact/contact';
import { Login } from './pages/login/login';
import { Admin } from './pages/admin/admin';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'about', component: About },
  { path: 'user/:id', component: UserDetail },
  { path: 'contact', component: Contact },
  { path: 'login', component: Login },
  { path: 'admin', component: Admin, canActivate: [authGuard] },
];
