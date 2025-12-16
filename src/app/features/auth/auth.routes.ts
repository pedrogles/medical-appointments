import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { redirectIfAutenticatedGuard } from "./guards/redirectIfAuthenticated/redirect-if-autenticated.guard";

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    { 
        path: 'login', 
        component: LoginComponent, 
        canActivate: [redirectIfAutenticatedGuard]
    },
    { 
        path: 'register', 
        component: RegisterComponent, 
        canActivate: [redirectIfAutenticatedGuard]
    },
    {
        path: '**',
        redirectTo: 'login'
    }

];