export interface Appointment {
  id: number;
  patientName: string;
  doctorId: number;
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}