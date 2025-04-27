import React, { useState } from 'react';
import { clientLogin } from '../services/ClientAuthService';
import { mechanicLogin } from '../services/MechanicAuthService';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'client' | 'mechanic'>('client');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (userType === 'client') {
        const response = await clientLogin({ username, password });
        localStorage.setItem('accessToken', response.accessToken);
        navigate("/");
      } else {
        const response = await mechanicLogin({ username, password });
        localStorage.setItem('accessToken', response.accessToken);
        navigate("/");
      }
      
    } catch (err: any) {
      console.error(err);
      setError('Login failed. Please check your credentials.');
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
            onChange={(e) => setUserType(e.target.value as 'client' | 'mechanic')}
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
