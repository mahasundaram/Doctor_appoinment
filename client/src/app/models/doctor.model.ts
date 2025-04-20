export interface Doctor {
  id?: number;
  fullName: string;
  specialization: string;
  experience: number;
  availableSlots: string; // JSON string like '["Monday", "Wednesday"]'
  contactInfo: string;
}
