import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { DoctorService } from '../../services/doctor.service';
import { AppointmentService } from '../../services/appointment.service';
import { Doctor } from '../../models/doctor.model';
import { Appointment } from '../../models/appointment.model';

@Component({
  selector: 'app-doctor-details',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {
  doctor: Doctor | null = null;
  appointments: Appointment[] = [];
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private doctorService: DoctorService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadDoctorDetails(id);
      this.loadAppointments(id);
    } else {
      this.error = true;
      this.loading = false;
    }
  }

  private loadDoctorDetails(id: number): void {
    this.doctorService.getDoctor(id).subscribe({
      next: (doc) => {
        this.doctor = {
          ...doc,
          availableSlots: JSON.parse(doc.availableSlots)
        };
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  private loadAppointments(id: number): void {
    this.appointmentService.getAppointmentsByDoctor(id).subscribe({
      next: (appointments) => this.appointments = appointments,
      error: () => console.error('Failed to load appointments')
    });
  }

  bookAppointment() {
    if (this.doctor?.id) {
      this.router.navigate(['/appointments/new'], {
        queryParams: { doctorId: this.doctor.id }
      });
    }
  }
}
