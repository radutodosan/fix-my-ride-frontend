import React, { useEffect, useState } from 'react';
import { changeMechanicEmail, changeMechanicPassword, getMechanicProfile } from '../services/MechanicsService';
import { useAlert } from '../contexts/AlertContext';
import { handleApiError } from '../utils/handleApiError';

interface MechanicDetails {
  username: string;
  email: string;
}

const MechanicProfilePage: React.FC = () => {
  const { showError, showSuccess } = useAlert();

  const [mechanic, setMechanic] = useState<MechanicDetails | null>(null);
  const [showEditProfile, setShowEditProfile] = useState(false);

  // Change password
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Change email
  const [passwordForEmail, setPasswordForEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const fetchProfile = async () => {
    try {
      const data = await getMechanicProfile();
      setMechanic(data);
    } catch (error) {
      console.error(error);
      showError('Failed to load mechanic profile.');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await changeMechanicPassword({ currentPassword, newPassword });
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
      await changeMechanicEmail({ password: passwordForEmail, newEmail });
      showSuccess('Email changed successfully!');
      setPasswordForEmail('');
      setNewEmail('');
      fetchProfile();
    } catch (error) {
      const message = handleApiError(error);
      showError(message);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '50px auto' }}>
      <h2>Mechanic Profile</h2>

      {mechanic ? (
        <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p><strong>Username:</strong> {mechanic.username}</p>
            <p><strong>Email:</strong> {mechanic.email}</p>
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
        </div>
      ) : (
        <p>Loading mechanic details...</p>
      )}

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
  );
};

export default MechanicProfilePage;
