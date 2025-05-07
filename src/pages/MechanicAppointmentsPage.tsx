import React, { useEffect, useState } from 'react';
import { getMechanicAppointments, updateAppointmentStatusAsMechanic } from '../services/AppointmentsService';
import { useAlert } from '../contexts/AlertContext';
import { handleApiError } from '../utils/handleApiError';
import { Appointment } from '../types/Appointment';
import AppointmentListContainer from '../components/AppointmentListContainer';
import { Button } from 'react-bootstrap';
import { UserType } from '../types/userType';

const MechanicAppointmentsPage: React.FC = () => {
  const { showError, showSuccess } = useAlert();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const fetchAppointments = async () => {
    try {
      const data = await getMechanicAppointments();
      setAppointments(data);
    } catch (error) {
      console.error(error);
      showError('Failed to load appointments.');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointmentId: number, status: 'CONFIRMED' | 'CANCELLED') => {
    try {
      await updateAppointmentStatusAsMechanic(appointmentId, status);
      showSuccess('Appointment status updated successfully!');
      fetchAppointments();
    } catch (error) {
      const message = handleApiError(error);
      showError(message);
    }
  };

  return (
    <AppointmentListContainer
      userType={UserType.MECHANIC}
      appointments={appointments}
      renderActions={(appointment) => (
        <>
          {appointment.status === 'PENDING' && (
            <div style={{ marginTop: '10px' }}>
              <Button
                onClick={() => handleUpdateStatus(appointment.id, 'CONFIRMED')}
                style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}
              >
                Confirm
              </Button>
              <Button
                onClick={() => handleUpdateStatus(appointment.id, 'CANCELLED')}
                style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px' }}
              >
                Cancel
              </Button>
            </div>
          )}
        </>
      )}
    />


  );
};

export default MechanicAppointmentsPage;