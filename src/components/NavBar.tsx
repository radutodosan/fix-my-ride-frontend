import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('accessToken');

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
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

      <div>
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
