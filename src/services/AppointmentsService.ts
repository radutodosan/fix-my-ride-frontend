import { createAxiosPrivateManager } from './AxiosManager';
import { ApiServiceType } from '../types/apiServiceType';
import { CreateAppointmentRequest } from '../types/CreateAppointmentRequest';

const APPOINTMENTS_URL = createAxiosPrivateManager(ApiServiceType.APPOINTMENT);

export const getClientAppointments = async () => {
  const response = await APPOINTMENTS_URL.get('/appointments/user/view-appointments');
  return response.data.data;
};

export const createAppointment = async (appointmentData: CreateAppointmentRequest) => {
  const response = await APPOINTMENTS_URL.post('/appointments/user/create', appointmentData);
  return response.data.data;
};