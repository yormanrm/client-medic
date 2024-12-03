import { Routes } from '@angular/router';
import { authenticationGuard } from './core/guards/authentication.guard';

export const routes: Routes = [
    {
        path: '',
        canActivate: [authenticationGuard],
        title: 'Dashboard',
        loadChildren: () => import('./core/pages/layout/layout.routes').then(r => r.routes)
    },
    {
        path: 'authentication',
        canActivate: [authenticationGuard],
        title: 'Authentication',
        loadComponent: () => import('./core/pages/authentication/authentication.component').then(c => c.AuthenticationComponent)
    },
    {
        path: '**',
        title: '404 Not Found',
        loadComponent: () => import('./core/pages/not-found/not-found.component').then(c => c.NotFoundComponent)
    }
];
