import React, { useEffect, useState } from 'react';
import { changeEmail, changePassword, getClientProfile } from '../services/ClientsService';
import { getClientCars, addCar, deleteCar, updateCar } from '../services/CarsService';
import { useAlert } from '../contexts/AlertContext';
import { Car } from '../types/Car';
import { handleApiError } from '../utils/handleApiError';
import { UserDetails } from '../types/UserDetails';
import ProfileContainer from '../components/ProfileContainer';
import { Collapse, Card, Form, Row, Col, Button, ListGroup } from 'react-bootstrap';


const ClientProfilePage: React.FC = () => {
  const { showError, showSuccess } = useAlert();

  const [client, setClient] = useState<UserDetails | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [showAddCarForm, setShowAddCarForm] = useState(false);

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [licensePlate, setLicensePlate] = useState('');

  const [editCarId, setEditCarId] = useState<number | null>(null);

  const [showEditProfile, setShowEditProfile] = useState(false);

  // Change password
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Change email
  const [passwordForEmail, setPasswordForEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');



  const fetchCars = async () => {
    try {
      const data = await getClientCars();
      setCars(data);
    } catch (error) {
      console.error(error);
      showError('Failed to load cars.');
    }
  };

  const fetchProfile = async () => {
    try {
      const data = await getClientProfile();
      setClient(data);
    } catch (error) {
      console.error(error);
      showError('Failed to load client profile.');
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchCars();
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await changePassword({ currentPassword, newPassword });
      showSuccess('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      const message = handleApiError(error);
      showError(message);
    }
  };

  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await changeEmail({ password: passwordForEmail, newEmail });
      showSuccess('Email changed successfully!');
      setPasswordForEmail('');
      setNewEmail('');
      fetchProfile();
    } catch (error) {
      const message = handleApiError(error);
      showError(message);
    }
  };

  const handleAddOrUpdateCar = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editCarId) {
        await updateCar(editCarId, { brand, model, year, licensePlate });
        showSuccess('Car updated successfully!');
      } else {
        await addCar({ brand, model, year, licensePlate });
        showSuccess('Car added successfully!');
      }

      // Reset state
      setBrand('');
      setModel('');
      setYear(new Date().getFullYear());
      setLicensePlate('');
      setEditCarId(null);
      setShowAddCarForm(false);

      fetchCars();
    } catch (error) {
      const message = handleApiError(error);
      showError(message);
    }
  };


  const handleEditCar = (car: Car) => {
    setEditCarId(car.id);
    setBrand(car.brand);
    setModel(car.model);
    setYear(car.year);
    setLicensePlate(car.licensePlate);
    setShowAddCarForm(true);
  };


  const handleDeleteCar = async (carId: number) => {
    if (!window.confirm('Are you sure you want to delete this car?')) {
      return;
    }

    try {
      await deleteCar(carId);
      showSuccess('Car deleted successfully!');
      fetchCars();
    } catch (error) {
      console.error(error);
      showError('Failed to delete car.');
    }
  };

  return (
    <div style={{ maxWidth: '750px', margin: '50px auto' }}>
      <ProfileContainer
        title="Client Profile"
        user={client}
        showEditProfile={showEditProfile}
        onToggleEdit={() => setShowEditProfile(!showEditProfile)}
        currentPassword={currentPassword}
        newPassword={newPassword}
        passwordForEmail={passwordForEmail}
        newEmail={newEmail}
        setCurrentPassword={setCurrentPassword}
        setNewPassword={setNewPassword}
        setPasswordForEmail={setPasswordForEmail}
        setNewEmail={setNewEmail}
        handleChangePassword={handleChangePassword}
        handleChangeEmail={handleChangeEmail}
      />

      <div className="border-top mt-4 pt-3">
        <Row className="align-items-center mb-3">
          <Col><h4>My Cars</h4></Col>
          <Col className="text-end">
            <Button onClick={() => setShowAddCarForm(!showAddCarForm)}>
              {showAddCarForm ? 'Cancel' : 'Add Car'}
            </Button>
          </Col>
        </Row>
      </div>

      <Collapse in={showAddCarForm}>
        <div>
          <Card className="p-4 mb-4 shadow-sm bg-light">
            <Form onSubmit={handleAddOrUpdateCar}>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formBrand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                      type="text"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formModel">
                    <Form.Label>Model</Form.Label>
                    <Form.Control
                      type="text"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formYear">
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                      type="number"
                      value={year}
                      onChange={(e) => setYear(Number(e.target.value))}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formLicensePlate">
                    <Form.Label>License Plate</Form.Label>
                    <Form.Control
                      type="text"
                      value={licensePlate}
                      onChange={(e) => setLicensePlate(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button type="submit" variant="success">
                {editCarId ? 'Update Car' : 'Add Car'}
              </Button>
            </Form>
          </Card>
        </div>
      </Collapse>

      {cars.length === 0 ? (
        <p>No cars found.</p>
      ) : (
        <ListGroup>
          {cars.map((car) => (
            <ListGroup.Item key={car.id} className="d-flex justify-content-between align-items-center">
              <div>
                <p className="mb-1"><strong>{car.brand} {car.model}</strong></p>
                <small>{car.year} – Plate: {car.licensePlate}</small>
              </div>
              <div>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEditCar(car)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteCar(car.id)}
                >
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default ClientProfilePage;
