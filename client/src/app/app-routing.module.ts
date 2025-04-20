import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorListComponent } from './components/doctor-list/doctor-list.component';
import { DoctorFormComponent } from './components/doctor-form/doctor-form.component';
import { DoctorDetailsComponent } from './components/doctor-details/doctor-details.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'doctors', pathMatch: 'full' },
  { path: 'doctors', component: DoctorListComponent },
  { path: 'doctors/new', component: DoctorFormComponent },
  { path: 'doctors/:id', component: DoctorDetailsComponent },
  { path: 'appointments', component: AppointmentListComponent },
  { path: 'appointments/new', component: AppointmentFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


// import { Routes } from '@angular/router';
// import { DoctorListComponent } from './components/doctor-list/doctor-list.component';
// import { DoctorFormComponent } from './components/doctor-form/doctor-form.component';
// import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
// import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';

// export const routes: Routes = [
//   { path: 'doctors', component: DoctorListComponent },
//   { path: 'doctors/new', component: DoctorFormComponent },
//   { path: 'appointments', component: AppointmentListComponent },
//   { path: 'appointments/new', component: AppointmentFormComponent },
//   { path: '', redirectTo: '/doctors', pathMatch: 'full' }, // Default route
// ];

