import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'app',
    loadChildren: () =>
      import('./pages/pages.routes').then(m => m.PAGES_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];