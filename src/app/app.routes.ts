import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FeedbackListComponent } from './components/feedback-list/feedback-list.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
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
        path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
        children: [
            {
                path: '', component: FeedbackListComponent
            },
            {
                path: 'profile', component: ProfileComponent
            }
        ]
    },
    {
        path: '**', redirectTo: 'dashboard'
    }
];
