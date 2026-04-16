import { Routes } from "@angular/router";
import { AppointmentComponent } from "./pages/appointment/appointment.component";


export const APPOINTMENT_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'novo',
        pathMatch: 'full'
    },
    { 
        path: 'novo', 
        component: AppointmentComponent
    },
    {
        path: '**',
        redirectTo: 'novo'
    }

];