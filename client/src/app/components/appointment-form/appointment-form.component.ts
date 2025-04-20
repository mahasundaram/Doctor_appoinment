import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { AppointmentService } from '../../services/appointment.service';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm: FormGroup;
  doctors: Doctor[] = [];
  selectedDoctorId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.appointmentForm = this.fb.group({
      patientName: ['', Validators.required],
      doctorId: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      contactInfo: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadDoctors();
    this.route.queryParams.subscribe(params => {
      if (params['doctorId']) {
        this.selectedDoctorId = Number(params['doctorId']);
        this.appointmentForm.patchValue({ doctorId: this.selectedDoctorId });
      }
    });
  }

  loadDoctors(): void {
    this.doctorService.getDoctorsName().subscribe(
      (doctors) => {
        this.doctors = doctors;
      },
      (error) => {
        console.error('Error loading doctors:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      this.appointmentService.createAppointment({
        ...this.appointmentForm.value,
        status: 'scheduled'
      }).subscribe(
        () => {
          this.router.navigate(['/appointments']);
        },
        (error) => {
          console.error('Error creating appointment:', error);
        }
      );
    }
  }
}
