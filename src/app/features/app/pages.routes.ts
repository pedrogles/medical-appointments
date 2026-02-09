import { Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { PatientRegistrationComponent } from "./pages/patient-registration/patient-registration.component";

export const PAGES_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    { 
        path: 'dashboard', 
        component: DashboardComponent, 
    },
    { 
        path: 'pacientes/novo', 
        component: PatientRegistrationComponent, 
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }

];