import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { WidgetComponent } from './components/widget/widget.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'widget', pathMatch: 'full'
    },
    {
        path: 'widget', component: WidgetComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'dashboard', component: DashboardComponent
    }
];
