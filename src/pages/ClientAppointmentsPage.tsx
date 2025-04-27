import React, { useEffect, useState } from 'react';
import { getClientAppointments, cancelAppointmentAsClient } from '../services/AppointmentsService';
import { useAlert } from '../contexts/AlertContext';
import { Appointment } from '../types/Appointment';
import { Link } from 'react-router-dom';
import { handleApiError } from '../utils/handleApiError';

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
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    try {
      await cancelAppointmentAsClient(appointmentId);
      showSuccess('Appointment cancelled successfully!');
      fetchAppointments(); // 🔥 Refacem lista
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
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>My Appointments</h2>
        <Link to="/client/appointments/create" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '8px 16px', borderRadius: '5px', backgroundColor: '#28a745', color: 'white', border: 'none' }}>
            New Appointment
          </button>
        </Link>
      </div>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {appointments.map((appointment) => (
            <div key={appointment.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '8px', position: 'relative' }}>
              <h4>{appointment.title}</h4>
              <p><strong>Description:</strong> {appointment.description}</p>
              <p><strong>Mechanic:</strong> {appointment.mechanicUsername}</p>
              <p><strong>Car:</strong> {appointment.carDetails}</p>
              <p><strong>Date:</strong> {appointment.appointmentDate}</p>
              <p><strong>Time:</strong> {appointment.appointmentTime}</p>
              <p><strong>Status:</strong> {appointment.status}</p>

              {appointment.status !== 'CANCELLED' && (
                <button
                  onClick={() => handleCancelAppointment(appointment.id)}
                  style={{
                    marginTop: '10px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '5px'
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientAppointmentsPage;