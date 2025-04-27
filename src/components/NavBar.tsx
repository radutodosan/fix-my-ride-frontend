import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from '../contexts/AlertContext';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { showInfo } = useAlert();

  const accessToken = localStorage.getItem('accessToken');
  const userType = localStorage.getItem('userType');
  const username = localStorage.getItem('username');


  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userType');
    showInfo("Logged out succesfully!");
    navigate('/');
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
            {userType === 'client' && (
              <>
                <Link to="/client/appointments" style={{ color: 'white', textDecoration: 'none' }}>Appointments</Link>
                <Link to={`/client/profile/${username}`} style={{ color: 'white', textDecoration: 'none' }}>Profile</Link>
                <Link to="/client/mechanics" style={{ color: 'white', textDecoration: 'none' }}>Mechanics</Link>
              </>
            )}
            {userType === 'mechanic' && (
              <>
                <Link to="/mechanic/appointments" style={{ color: 'white', textDecoration: 'none' }}>Appointments</Link>
                <Link to={`/mechanic/profile/${username}`} style={{ color: 'white', textDecoration: 'none' }}>Profile</Link>
              </>
            )}

          </>
        )}

        {accessToken ? (
          <button onClick={handleLogout} style={{ background: 'white', color: '#333', padding: '5px 10px', borderRadius: '5px' }}>
            Logout
          </button>
        ) : (
          <Link to="/login" style={{ background: 'white', color: '#333', padding: '5px 10px', borderRadius: '5px', textDecoration: 'none' }}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
