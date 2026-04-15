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
    canMatch: [authGuard],
    loadComponent: () =>
      import('./core/layout/app-layout/app-layout.component').then(m => m.AppLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
      },
      {
        path: 'pacientes',
        loadChildren: () =>
          import('./features/patient/patient.routes').then(m => m.PATIENT_ROUTES)
      },
      {
        path: 'profissionais',
        loadChildren: () =>
          import('./features/professional/professional.routes').then(m => m.PROFESSIONAL_ROUTES)
      },
      {
        path: 'agendamentos',
        loadChildren: () =>
          import('./features/appointment/appointment.routes').then(m => m.APPOINTMENT_ROUTES)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
