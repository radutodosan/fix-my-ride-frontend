import React, { useState } from 'react';
import { clientLogin, mechanicLogin } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { handleApiError } from '../utils/handleApiError';
import { useAlert } from '../contexts/AlertContext';
import { getAccessToken, saveAccessToken, saveUsername, saveUserType } from '../utils/storageUtils';
import { UserType } from '../types/userType';

const LoginPage: React.FC = () => {
  const { showSuccess, showError } = useAlert();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<UserType.CLIENT | UserType.MECHANIC>(UserType.CLIENT);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (userType === UserType.CLIENT) {
        const response = await clientLogin({ username, password });
        saveAccessToken(response.token);
        saveUsername(response.client.username);

        console.log("Client: " + getAccessToken());
      } else if (userType === UserType.MECHANIC) {
        const response = await mechanicLogin({ username, password });
        saveAccessToken(response.token);
        console.log("Mechanic: " + getAccessToken());
        saveUsername(response.mechanic.username);
      }
      saveUserType(userType);

      showSuccess("Login succesful!");
      navigate("/");

    }
    catch (err: unknown) {
      const message = handleApiError(err);
      showError(message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div>
          <label>Username:</label><br />
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>User Type:</label><br />
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value as UserType.CLIENT | UserType.MECHANIC)}
            required
          >
            <option value="client">Client</option>
            <option value="mechanic">Mechanic</option>
          </select>
        </div>

        <button type="submit" style={{ marginTop: '10px' }}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
