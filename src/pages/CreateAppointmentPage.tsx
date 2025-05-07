import React, { useEffect, useState } from 'react';
import { createAppointment } from '../services/AppointmentsService';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlert } from '../contexts/AlertContext';
import { getClientCars } from '../services/CarsService';
import { Car } from '../types/Car';
import { Button, Form } from 'react-bootstrap';
import { AxiosError } from 'axios';



const CreateAppointmentPage: React.FC = () => {
  const { mechanicUsername } = useParams<{ mechanicUsername: string }>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const { showSuccess, showError } = useAlert();
  const navigate = useNavigate();

  const fetchCars = async () => {
    try {
      const data = await getClientCars();
      setCars(data);
    } catch (error) {
      console.error(error);
      showError('Failed to load cars.');
    }
  };

  useEffect(() => {
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
        mechanicUsername: mechanicUsername ?? '',
        title,
        description,
        appointmentDate,
        carDetails,
      });

      showSuccess("Appointment created successfully!");
      navigate('/client/appointments');
    } catch (error) {
      console.error(error);

      const axiosError = error as AxiosError<{ message: string }>;

      const message = axiosError.response?.data?.message || 'Failed to create appointment.';

      showError(message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Create Appointment at: {mechanicUsername}</h2>
      <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
        <Form.Group className="mb-3" controlId="formCar">
          <Form.Label>Select Your Car</Form.Label>
          <Form.Select
            value={selectedCarId ?? ''}
            onChange={(e) => setSelectedCarId(Number(e.target.value))}
            required
          >
            <option value="">Select a car</option>
            {cars.map((car) => (
              <option key={car.id} value={car.id}>
                {car.brand} {car.model} ({car.year})
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter appointment title"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            placeholder="Describe the issue or service needed"
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formDate">
          <Form.Label>Appointment Date</Form.Label>
          <Form.Control
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100">
          Book Appointment
        </Button>
      </Form>
    </div>
  );
};

export default CreateAppointmentPage;
