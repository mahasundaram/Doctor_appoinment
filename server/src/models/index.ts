export interface Doctor {
  id?: number;
  fullName: string;
  specialization: string; 
  experience: number;
  availableSlots: string; 
  contactInfo: string;
}

export interface Appointment {
  id?: number;
  doctorId: number;
  patientName: string;
  appointmentTime: string;
  contactInfo: string;
  status: 'pending' | 'confirmed' | 'rejected';
}
