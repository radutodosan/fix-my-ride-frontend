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
      showInfo("Logged out successfully!");
      navigate('/');
    } catch (error) {
      console.error(error);
      showError('Logout failed.');
    }
  };

  const navStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    backgroundColor: '#2c3e50',
    color: '#fff',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
  };

  const linkStyle: React.CSSProperties = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 500,
    padding: '6px 10px',
    borderRadius: '4px',
    transition: 'background-color 0.2s ease'
  };


  const buttonStyle: React.CSSProperties = {
    background: '#ecf0f1',
    color: '#2c3e50',
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease'
  };

  const buttonHoverStyle: React.CSSProperties = {
    backgroundColor: '#bdc3c7'
  };

  return (
    <nav style={navStyle}>
      <div>
        <Link to="/" style={{ ...linkStyle, fontSize: '1.25rem' }}>
          FixMyRide
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        {accessToken && userType === UserType.CLIENT && (
          <>
            <Link to="/client/appointments" className="nav-link">
              Appointments
            </Link>
            <Link to="/client/mechanics" className="nav-link">
              Mechanics
            </Link>
            <Link to={`/client/profile/${username}`} className="nav-link">
              Profile
            </Link>
          </>
        )}
        {accessToken && userType === UserType.MECHANIC && (
          <>
            <Link to="/mechanic/appointments" className="nav-link">
              Appointments
            </Link>
            <Link to={`/mechanic/profile/${username}`} className="nav-link">
              Profile
            </Link>
          </>
        )}

        {accessToken ? (
          <button
            onClick={handleLogout}
            style={buttonStyle}
            onMouseOver={e => Object.assign(e.currentTarget.style, buttonHoverStyle)}
            onMouseOut={e => Object.assign(e.currentTarget.style, buttonStyle)}
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" style={buttonStyle as React.CSSProperties} onMouseOver={e => Object.assign(e.currentTarget.style, buttonHoverStyle)} onMouseOut={e => Object.assign(e.currentTarget.style, buttonStyle)}>
              Login
            </Link>
            <Link to="/signup" style={buttonStyle as React.CSSProperties} onMouseOver={e => Object.assign(e.currentTarget.style, buttonHoverStyle)} onMouseOut={e => Object.assign(e.currentTarget.style, buttonStyle)}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
