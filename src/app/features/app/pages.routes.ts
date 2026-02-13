import { Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { PatientRegistrationComponent } from "./pages/patient-registration/patient-registration.component";
import { ProfessionalRegistrationComponent } from "./pages/professional-registration/professional-registration.component";
import { AppointmentComponent } from "./pages/appointment/appointment.component";

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
        path: 'profissionais/novo', 
        component: ProfessionalRegistrationComponent, 
    },
    { 
        path: 'agendamentos/novo', 
        component: AppointmentComponent, 
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }

];