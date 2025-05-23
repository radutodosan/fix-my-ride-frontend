export interface Appointment {
  id: number
  clientUsername: string;
  mechanicUsername: string;
  title: string;
  description: string;
  date: string; // LocalDateTime on Backend
  carDetails: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
}