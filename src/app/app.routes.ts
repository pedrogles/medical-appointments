import { Routes } from '@angular/router';
import { authGuard } from './features/auth/guards/auth/auth.guard';

export const routes: Routes = [
    {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'app',
    loadChildren: () =>
      import('./features/app/pages.routes').then(m => m.PAGES_ROUTES),
    canMatch: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
