import { Routes } from '@angular/router';
import { WidgetComponent } from './components/widget/widget.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'widget', pathMatch: 'full'
    },
    {
        path: 'widget', component: WidgetComponent
    },
    {
        path: 'dashboard', component: DashboardComponent
    }
];
