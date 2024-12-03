import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout.component";

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                title: 'Dashboard',
                loadComponent: () => import('../../../features/dashboard/dashboard.component').then(c => c.DashboardComponent)
            }
        ]
    }
];