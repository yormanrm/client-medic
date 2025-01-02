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
            },
            {
                path: 'doctors',
                title: 'Doctors',
                loadComponent: () => import('../../../features/doctors/doctors.component').then(c => c.DoctorsComponent)
            },
            {
                path: 'patients',
                title: 'Patients',
                loadComponent: () => import('../../../features/patients/patients.component').then(c => c.PatientsComponent)
            },
            {
                path: 'pharmacists',
                title: 'Pharmacists',
                loadComponent: () => import('../../../features/pharmacists/pharmacists.component').then(c => c.PharmacistsComponent)
            },
            {
                path: 'appointments',
                title: 'Appointments',
                loadComponent: () => import('../../../features/appointments/appointments.component').then(c => c.AppointmentsComponent)
            }
        ]
    }
];