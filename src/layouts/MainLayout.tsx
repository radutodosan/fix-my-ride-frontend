import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/NavBar';

const MainLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
