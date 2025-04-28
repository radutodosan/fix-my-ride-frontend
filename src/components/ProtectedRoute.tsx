import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserType } from '../types/userType';
import { getAccessToken, getUserType } from '../utils/storageUtils';

interface ProtectedRouteProps {
  allowedUserType: UserType.CLIENT | UserType.MECHANIC;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedUserType, children }) => {

  const token = getAccessToken();
  const userType = getUserType();

  if (!token || userType !== allowedUserType) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;