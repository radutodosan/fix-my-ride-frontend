import React, { useEffect, useState } from 'react';
import { getClientAppointments } from '../services/AppointmentsService';
import { useAlert } from '../contexts/AlertContext';
import { Appointment } from '../types/Appointment';
import { Link } from 'react-router-dom';

const ClientAppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { showError } = useAlert();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getClientAppointments();
        setAppointments(data);
      } catch (error) {
        console.error(error);
        showError('Failed to load appointments.');
      }
    };

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
          {appointments.map((appointment, index) => (
            <li key={index} style={{ marginBottom: '15px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
              <p><strong>Title:</strong> {appointment.title}</p>
              <p><strong>Description:</strong> {appointment.description}</p>
              <p><strong>Mechanic:</strong> {appointment.mechanicUsername}</p>
              <p><strong>Car:</strong> {appointment.carDetails}</p>
              <p><strong>Appointment Date:</strong> {appointment.appointmentDate}</p>
              <p><strong>Appointment Time:</strong> {appointment.appointmentTime}</p>
              <p><strong>Created At:</strong> {new Date(appointment.date).toLocaleString()}</p>
              <p><strong>Status:</strong> {appointment.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientAppointmentsPage;