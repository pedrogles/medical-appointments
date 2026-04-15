import { Routes } from "@angular/router";
import { AppointmentSheduleComponent } from "./pages/appointment-shedule/appointment-shedule.component";


export const APPOINTMENT_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'novo',
        pathMatch: 'full'
    },
    { 
        path: 'novo', 
        component: AppointmentSheduleComponent
    },
    {
        path: '**',
        redirectTo: 'novo'
    }

];