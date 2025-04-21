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

  // Dropdown options for specialization
  specializations: string[] = [
    'General Physician',
    'Dentist',
    'Cardiologist',
    'Neurologist',
    'Dermatologist',
    'Pediatrician',
    'Gynecologist'
  ];

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private router: Router
  ) {
    this.doctorForm = this.fb.group({
      fullName: ['', Validators.required],
      specialization: ['', Validators.required], // Dropdown binding
      experience: [0, [Validators.required, Validators.min(0)]],
      availableSlots: [[], Validators.required], // Assume checkbox or multiselect in template
      contactInfo: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.doctorForm.valid) {
      const formValue = this.doctorForm.value;
      const doctorPayload = {
        ...formValue,
        availableSlots: JSON.stringify(formValue.availableSlots) // Convert array to JSON string
      };

      this.doctorService.createDoctor(doctorPayload).subscribe(() => {
        alert('Doctor added successfully!');
        this.router.navigate(['/doctors']);
      });
    }
  }
}
