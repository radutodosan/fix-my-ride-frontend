import React, { useEffect, useState } from 'react';
import { useAlert } from '../contexts/AlertContext';
import { getAllMechanics } from '../services/ClientsService';
import { UserDetails } from '../types/UserDetails';
import { handleApiError } from '../utils/handleApiError';

const ClientMechanicsPage: React.FC = () => {
  const [mechanics, setMechanics] = useState<UserDetails[]>([]);
  const { showError } = useAlert();

  const fetchMechanics = async () => {
    try {
      const data = await getAllMechanics();
      setMechanics(data);
    } catch (error) {
      const message = handleApiError(error);
      showError(message);
    }
  };
  useEffect(() => {


    fetchMechanics();
  }, []);

  return (
    <div style={{ maxWidth: '700px', margin: '50px auto' }}>
      <h2>Available Mechanics</h2>
      {mechanics.length === 0 ? (
        <p>No mechanics found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {mechanics.map((mechanic, index) => (
            <li key={index} style={{ padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
              <p><strong>Username:</strong> {mechanic.username}</p>
              <p><strong>Email:</strong> {mechanic.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientMechanicsPage;