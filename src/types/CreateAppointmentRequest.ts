export interface CreateAppointmentRequest {
  mechanicUsername: string;
  title: string;
  description: string;
  appointmentDate: string;
  appointmentTime: string;
  carDetails: string;
}