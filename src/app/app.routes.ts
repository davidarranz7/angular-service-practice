import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { UserDetail } from './pages/user-detail/user-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  { path: 'about', component: About },
  { path: 'user/:id', component: UserDetail },
];
