import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedUserType: 'client' | 'mechanic';
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedUserType, children }) => {
  const token = localStorage.getItem('accessToken');
  const userType = localStorage.getItem('userType');

  if (!token || userType !== allowedUserType) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
