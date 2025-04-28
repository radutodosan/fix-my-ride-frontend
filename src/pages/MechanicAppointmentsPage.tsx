import React, { useEffect, useState } from 'react';
import { getMechanicAppointments, updateAppointmentStatusAsMechanic } from '../services/AppointmentsService';
import { useAlert } from '../contexts/AlertContext';
import { handleApiError } from '../utils/handleApiError';
import { Appointment } from '../types/Appointment';

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
    <div style={{ maxWidth: '800px', margin: '50px auto' }}>
      <h2>My Appointments</h2>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        appointments.map((appointment) => (
          <div key={appointment.id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '15px', borderRadius: '8px', position: 'relative' }}>
            <h4>{appointment.title}</h4>
            <p><strong>Description:</strong> {appointment.description}</p>
            <p><strong>Client:</strong> {appointment.userUsername}</p>
            <p><strong>Car:</strong> {appointment.carDetails}</p>
            <p><strong>Date:</strong> {appointment.appointmentDate} at {appointment.appointmentTime}</p>
            <p><strong>Status:</strong> {appointment.status}</p>

            {appointment.status === 'PENDING' && (
              <div style={{ marginTop: '10px' }}>
                <button
                  onClick={() => handleUpdateStatus(appointment.id, 'CONFIRMED')}
                  style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}
                >
                  Confirm
                </button>
                <button
                  onClick={() => handleUpdateStatus(appointment.id, 'CANCELLED')}
                  style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px' }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MechanicAppointmentsPage;