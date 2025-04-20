import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatButtonModule],
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  appointments: any[] = [];
  error: boolean = false;
  loading: boolean = true;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.fetchAppointments();
  }

  fetchAppointments(): void {
    this.loading = true;
    this.appointmentService.getAppointments().subscribe({
      next: (data: any[]) => {
        this.appointments = data;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  cancelAppointment(id: number): void {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      this.appointmentService.deleteAppointment(id).subscribe(() => {
        alert('Appointment cancelled.');
        this.fetchAppointments();
      });
    }
  }
}
