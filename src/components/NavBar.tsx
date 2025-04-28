import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from '../contexts/AlertContext';
import { clientLogout, mechanicLogout } from '../services/AuthService';
import { clearAuthData, getAccessToken, getUsername, getUserType } from '../utils/storageUtils';
import { UserType } from '../types/userType';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { showError, showInfo } = useAlert();

  const accessToken = getAccessToken();
  const userType = getUserType();
  const username = getUsername();

  const handleLogout = async () => {
    try {
      if (userType === UserType.CLIENT) {
        await clientLogout();
      } else if (userType === UserType.MECHANIC) {
        await mechanicLogout();
      }
      clearAuthData();
      showInfo("Logged out succesfully!");
      navigate('/');
    } catch (error) {
      console.error(error);
      showError('Logout failed.');
    }
  };


  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#333',
      color: '#fff'
    }}>
      <div>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          FixMyRide
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        {accessToken && (
          <>
            {userType === UserType.CLIENT && (
              <>
                <Link to="/client/appointments" style={{ color: 'white', textDecoration: 'none' }}>Appointments</Link>
                <Link to={`/client/profile/${username}`} style={{ color: 'white', textDecoration: 'none' }}>Profile</Link>
                <Link to="/client/mechanics" style={{ color: 'white', textDecoration: 'none' }}>Mechanics</Link>
              </>
            )}
            {userType === UserType.MECHANIC && (
              <>
                <Link to="/mechanic/appointments" style={{ color: 'white', textDecoration: 'none' }}>Appointments</Link>
                <Link to={`/mechanic/profile/${username}`} style={{ color: 'white', textDecoration: 'none' }}>Profile</Link>
              </>
            )}

          </>
        )}

        {accessToken ?
          (
            <button onClick={handleLogout} style={{ background: 'white', color: '#333', padding: '5px 10px', borderRadius: '5px' }}>
              Logout
            </button>
          ) :
          (
            <>
              <Link to="/login" style={{ background: 'white', color: '#333', padding: '5px 10px', borderRadius: '5px', textDecoration: 'none' }}>
                Login
              </Link>
              <Link to="/signup" style={{ background: 'white', color: '#333', padding: '5px 10px', borderRadius: '5px', textDecoration: 'none' }}>
                Sign Up
              </Link>
            </>
          )}
      </div>
    </nav>
  );
};

export default Navbar;