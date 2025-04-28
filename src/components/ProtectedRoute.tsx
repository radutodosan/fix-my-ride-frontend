import React, { useLayoutEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getClientProfile } from '../services/ClientsService';
import { getMechanicProfile } from '../services/MechanicsService';
import { refreshClientToken, refreshMechanicToken } from '../services/AuthService';
import { getAccessToken, getUserType } from '../utils/storageUtils';
import { UserType } from '../types/userType';

interface ProtectedRouteProps {
  allowedUserType: UserType.CLIENT | UserType.MECHANIC;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedUserType, children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const token = getAccessToken()
  const userType = getUserType();

  const validateProfile = async (userType: string | null) => {
    if (userType === UserType.CLIENT) {
      await getClientProfile();
    } else if (userType === UserType.MECHANIC) {
      await getMechanicProfile();
    } else {
      throw new Error('Unknown user type');
    }
  };

  useLayoutEffect(() => {
    const validateAccess = async () => {
      if (!token || userType !== allowedUserType) {
        setIsAuthenticated(false);
        return;
      }

      try {
        await validateProfile(userType);
        setIsAuthenticated(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {

        if (error.response.status === 401 && error.response.data.message === "Invalid or expired token") {
          try {
            let newAccessToken = '';
            if (userType === UserType.CLIENT) {
              newAccessToken = await refreshClientToken();
            } else if (userType === UserType.MECHANIC) {
              newAccessToken = await refreshMechanicToken();
            } else {
              throw new Error('Unknown user type for refresh');
            }

            localStorage.setItem('accessToken', newAccessToken);

            // retry validation
            await validateProfile(userType);
            setIsAuthenticated(true);

          } catch (refreshError) {
            console.error('Failed to refresh token', refreshError);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userType');
            setIsAuthenticated(false);
            navigate('/login');
          }
        } else {
          console.error('Failed to validate token', error);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('userType');
          setIsAuthenticated(false);
          navigate('/login');
        }
      }
    };

    validateAccess();
  }, [token, userType, allowedUserType, navigate]);

  if (isAuthenticated === null) return <div>Loading...</div>;

  if (isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
