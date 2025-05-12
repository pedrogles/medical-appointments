import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { redirectIfAuthenticated } from "./guards/redirectIfAuthenticated/redirectIfAuthenticated.guard";


export const AUTH_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    { 
        path: 'login', 
        component: LoginComponent, 
        canActivate: [redirectIfAuthenticated]
    },
    { 
        path: 'register', 
        component: RegisterComponent, 
        canActivate: [redirectIfAuthenticated] 
    },
    {
        path: '**',
        redirectTo: 'login'
    }

];
