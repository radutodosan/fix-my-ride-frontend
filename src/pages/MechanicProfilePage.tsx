import React, { useEffect, useState } from 'react';
import {
  changeMechanicEmail, changeMechanicPassword, getMechanicProfile
} from '../services/MechanicsService';
import { useAlert } from '../contexts/AlertContext';
import { handleApiError } from '../utils/handleApiError';
import ProfileContainer from '../components/ProfileContainer';
import { UserDetails } from '../types/UserDetails';

const MechanicProfilePage: React.FC = () => {
  const { showError, showSuccess } = useAlert();
  const [mechanic, setMechanic] = useState<UserDetails | null>(null);
  const [showEditProfile, setShowEditProfile] = useState(false);

  // Password
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Email
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
      showError(handleApiError(error));
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
      showError(handleApiError(error));
    }
  };

  return (
    <ProfileContainer
      title="Mechanic Profile"
      user={mechanic}
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

  );
};

export default MechanicProfilePage;
