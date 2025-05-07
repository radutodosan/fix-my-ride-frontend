import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import {
  getClientAppointments,
  cancelAppointmentAsClient,
} from '../services/AppointmentsService';
import { useAlert } from '../contexts/AlertContext';
import { Appointment } from '../types/Appointment';
import { handleApiError } from '../utils/handleApiError';
import AppointmentListContainer from '../components/AppointmentListContainer';
import { UserType } from '../types/userType';

const ClientAppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { showSuccess, showError } = useAlert();

  const fetchAppointments = async () => {
    try {
      const data = await getClientAppointments();
      setAppointments(data);
    } catch (error) {
      console.error(error);
      showError('Failed to load appointments.');
    }
  };

  const handleCancelAppointment = async (appointmentId: number) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

    try {
      await cancelAppointmentAsClient(appointmentId);
      showSuccess('Appointment cancelled successfully!');
      fetchAppointments();
    } catch (error) {
      console.error(error);
      const message = handleApiError(error);
      showError(message);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <AppointmentListContainer
      userType={UserType.CLIENT}
      appointments={appointments}
      renderActions={(appointment) =>
        appointment.status !== 'CANCELLED' && (
          <Button
            variant="danger"
            onClick={() => handleCancelAppointment(appointment.id)}
          >
            Cancel
          </Button>
        )
      }
    />

  );
};

export default ClientAppointmentsPage;
