import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clientSignup, mechanicSignup } from '../services/AuthService';
import { useAlert } from '../contexts/AlertContext';
import { handleApiError } from '../utils/handleApiError';

const SignUpPage: React.FC = () => {
  const [userType, setUserType] = useState<'client' | 'mechanic'>('client');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { showSuccess, showError } = useAlert();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showError('Passwords do not match!');
      return;
    }

    try {
      const signupData = { username, email, password };

      if (userType === 'client') {
        await clientSignup(signupData);
      } else {
        await mechanicSignup(signupData);
      }

      showSuccess('Signup successful! You can now login.');
      navigate('/login');
    }
    catch (err) {
      console.error(err);
      const message = handleApiError(err);
      showError(message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>User Type:</label>
          <select value={userType} onChange={(e) => setUserType(e.target.value as 'client' | 'mechanic')}>
            <option value="client">Client</option>
            <option value="mechanic">Mechanic</option>
          </select>
        </div>

        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>

        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <div>
          <label>Confirm Password:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>

        <button type="submit" style={{ marginTop: '20px' }}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
