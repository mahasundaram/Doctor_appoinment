import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', redirectTo: '/doctors', pathMatch: 'full' },
  {
    path: 'doctors',
    loadComponent: () =>
      import('./components/doctor-list/doctor-list.component').then(m => m.DoctorListComponent)
  },
  {
    path: 'doctors/new',
    loadComponent: () =>
      import('./components/doctor-form/doctor-form.component').then(m => m.DoctorFormComponent)
  },
  {
    path: 'doctors/:id',
    loadComponent: () =>
      import('./components/doctor-details/doctor-details.component').then(m => m.DoctorDetailsComponent)
  },
  {
    path: 'appointments',
    loadComponent: () =>
      import('./components/appointment-list/appointment-list.component').then(m => m.AppointmentListComponent)
  },
  {
    path: 'appointments/new',
    loadComponent: () =>
      import('./components/appointment-form/appointment-form.component').then(m => m.AppointmentFormComponent)
  }
];
