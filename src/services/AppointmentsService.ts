import { createAxiosPrivateManager } from './AxiosManager';
import { ApiServiceType } from '../types/apiServiceType';
import { CreateAppointmentRequest } from '../types/CreateAppointmentRequest';

const APPOINTMENTS_URL = createAxiosPrivateManager(ApiServiceType.APPOINTMENT);

export const getClientAppointments = async () => {
  const response = await APPOINTMENTS_URL.get('/client/view-appointments');
  return response.data.data;
};

export const createAppointment = async (appointmentData: CreateAppointmentRequest) => {
  const response = await APPOINTMENTS_URL.post('/client/create', appointmentData);
  return response.data.data;
};

export const cancelAppointmentAsClient = async (appointmentId: number) => {
  const response = await APPOINTMENTS_URL.patch(`/client/cancel/${appointmentId}`);
  return response.data.data;
};


export const getMechanicAppointments = async () => {
  const response = await APPOINTMENTS_URL.get('/mechanic/view-appointments');
  return response.data.data;
};

export const updateAppointmentStatusAsMechanic = async (appointmentId: number, status: 'CONFIRMED' | 'CANCELLED') => {
  const response = await APPOINTMENTS_URL.patch(`/mechanic/update-status/${appointmentId}`, { status });
  return response.data.data;
};