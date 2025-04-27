import React, { useEffect, useState } from 'react';
import { changeEmail, changePassword, getClientProfile } from '../services/ClientService';
import { getClientCars, addCar, deleteCar, updateCar } from '../services/CarsService';
import { useAlert } from '../contexts/AlertContext';
import { Car } from '../types/Car';
import { handleApiError } from '../utils/handleApiError';
import { UserDetails } from '../types/UserDetails';


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
    setShowAddCarForm(true); // deschide form-ul cu datele precompletate
  };


  const handleDeleteCar = async (carId: number) => {
    if (!window.confirm('Are you sure you want to delete this car?')) {
      return;
    }

    try {
      await deleteCar(carId);
      showSuccess('Car deleted successfully!');
      fetchCars(); // reîncarcă lista după ștergere
    } catch (error) {
      console.error(error);
      showError('Failed to delete car.');
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '50px auto' }}>
      <h2>Client Profile</h2>

      {client ?
        (
          <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p><strong>Username:</strong> {client.username}</p>
              <p><strong>Email:</strong> {client.email}</p>
            </div>
            <button
              onClick={() => setShowEditProfile(!showEditProfile)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px'
              }}
            >
              {showEditProfile ? 'Cancel' : 'Edit Profile'}
            </button>
            {showEditProfile && (
              <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <h3>Change Password</h3>
                <form onSubmit={handleChangePassword} style={{ marginBottom: '20px' }}>
                  <div>
                    <label>Current Password:</label>
                    <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
                  </div>
                  <div>
                    <label>New Password:</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                  </div>
                  <button type="submit" style={{ marginTop: '10px' }}>
                    Change Password
                  </button>
                </form>

                <h3>Change Email</h3>
                <form onSubmit={handleChangeEmail}>
                  <div>
                    <label>New Email:</label>
                    <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required />
                  </div>
                  <div>
                    <label>Current Password:</label>
                    <input type="password" value={passwordForEmail} onChange={(e) => setPasswordForEmail(e.target.value)} required />
                  </div>
                  <button type="submit" style={{ marginTop: '10px' }}>
                    Change Email
                  </button>
                </form>
              </div>
            )}

          </div>

        ) :
        (
          <p>Loading client details...</p>
        )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>My Cars</h3>
        <button onClick={() => setShowAddCarForm(!showAddCarForm)} style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
          {showAddCarForm ? 'Cancel' : 'Add Car'}
        </button>
      </div>

      {showAddCarForm && (
        <form onSubmit={handleAddOrUpdateCar} style={{ marginTop: '20px', marginBottom: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <div>
            <label>Brand:</label>
            <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required />
          </div>
          <div>
            <label>Model:</label>
            <input type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
          </div>
          <div>
            <label>Year:</label>
            <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} required />
          </div>
          <div>
            <label>License Plate:</label>
            <input type="text" value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} required />
          </div>
          <button type="submit" style={{ marginTop: '10px' }}>
            Add Car
          </button>
        </form>
      )}

      {cars.length === 0 ? (
        <p>No cars found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {cars.map((car) => (
            <li key={car.id} style={{ padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '8px', position: 'relative' }}>
              <div>
                <p><strong>Brand:</strong> {car.brand}</p>
                <p><strong>Model:</strong> {car.model}</p>
                <p><strong>Year:</strong> {car.year}</p>
                <p><strong>License Plate:</strong> {car.licensePlate}</p>
              </div>
              <button
                onClick={() => handleEditCar(car)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '70px',
                  backgroundColor: '#ffc107',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '5px',
                }}
              >
                Edit
              </button>

              <button
                onClick={() => handleDeleteCar(car.id)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '5px',
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientProfilePage;
