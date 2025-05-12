import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';

export const PAGES_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'cadastro-de-paciente',
    component: PatientRegistrationComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];