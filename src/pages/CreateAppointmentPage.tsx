import React, { useEffect, useState } from 'react';
import { createAppointment } from '../services/AppointmentsService';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../contexts/AlertContext';
import { getClientCars } from '../services/CarsService';
import { Car } from '../types/Car';



const CreateAppointmentPage: React.FC = () => {
  const [mechanicUsername, setMechanicUsername] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const { showSuccess, showError } = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getClientCars();
        setCars(data);
      } catch (error) {
        console.error(error);
        showError('Failed to load cars.');
      }
    };

    fetchCars();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedCar = cars.find(car => car.id === selectedCarId);
    if (!selectedCar) {
      showError('Please select a car.');
      return;
    }

    const carDetails = `${selectedCar.brand} ${selectedCar.model}, ${selectedCar.year}`;

    try {
      await createAppointment({
        mechanicUsername,
        title,
        description,
        appointmentDate,
        appointmentTime,
        carDetails,
      });

      showSuccess('Appointment created successfully!');
      navigate('/client/appointments');
    } catch (error) {
      console.error(error);
      showError('Failed to create appointment.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto' }}>
      <h2>Create Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Mechanic Username:</label>
          <input type="text" value={mechanicUsername} onChange={(e) => setMechanicUsername(e.target.value)} required />
        </div>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Appointment Date:</label>
          <input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
        </div>
        <div>
          <label>Appointment Time:</label>
          <input type="time" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} required />
        </div>

        <div>
          <label>Select Your Car:</label>
          <select value={selectedCarId ?? ''} onChange={(e) => setSelectedCarId(Number(e.target.value))} required>
            <option value="">Select a car</option>
            {cars.map((car) => (
              <option key={car.id} value={car.id}>
                {car.brand} {car.model} ({car.year})
              </option>
            ))}
          </select>
        </div>

        <button type="submit" style={{ marginTop: '20px' }}>
          Create Appointment
        </button>
      </form>
    </div>
  );
};

export default CreateAppointmentPage;
