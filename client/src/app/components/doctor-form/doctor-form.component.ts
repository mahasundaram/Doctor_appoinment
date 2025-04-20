import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-doctor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.css']
})
export class DoctorFormComponent {
  doctorForm: FormGroup;
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private router: Router
  ) {
    this.doctorForm = this.fb.group({
      fullName: ['', Validators.required],
      specialization: ['', Validators.required],
      experience: [0, [Validators.required, Validators.min(0)]],
      availableSlots: [[], Validators.required],
      contactInfo: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.doctorForm.valid) {
      const formValue = this.doctorForm.value;
      const doctorPayload = {
        ...formValue,
        availableSlots: JSON.stringify(formValue.availableSlots)
      };
      this.doctorService.createDoctor(doctorPayload).subscribe(() => {
        this.router.navigate(['/doctors']);
      });
    }
  }
}
