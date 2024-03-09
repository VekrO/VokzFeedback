import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { WidgetComponent } from './components/widget/widget.component';
import { AuthGuard, AuthenticatedGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '', redirectTo: 'widget', pathMatch: 'full'
    },
    {
        path: 'widget', component: WidgetComponent
    },
    {
        path: 'register', component: RegisterComponent, canActivate: [AuthenticatedGuard]
    },
    {
        path: 'login', component: LoginComponent, canActivate: [AuthenticatedGuard]
    },
    {
        path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]
    },
    {
        path: '**', redirectTo: 'dashboard'
    }
];
