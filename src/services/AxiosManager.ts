import axios, { AxiosError } from 'axios';
import { ApiServiceType } from '../types/apiServiceType';
import { clearAuthData, getAccessToken, getUserType, saveAccessToken } from '../utils/storageUtils';
import { UserType } from '../types/userType';

const BASE_URLS: Record<ApiServiceType, string> = {
  [ApiServiceType.CLIENT]: 'http://localhost:8081',
  [ApiServiceType.MECHANIC]: 'http://localhost:8082',
  [ApiServiceType.APPOINTMENT]: 'http://localhost:8083',
};

// axios for requests WITHOUT authorization needed
export const createAxiosPublicManager = (serviceType: ApiServiceType) => {
  const instance = axios.create({
    baseURL: BASE_URLS[serviceType],
    withCredentials: true,
  });

  instance.interceptors.response.use(
    (response) => {
      console.log(`[API RESPONSE - ${serviceType}]`, response.data);
      return response;
    },
    (error) => {
      console.error(`[API ERROR - ${serviceType}]`, error.response?.data || error.message);
      return Promise.reject(error);
    }
  );

  return instance;
};

// axios for requests WITH authorization needed
export const createAxiosPrivateManager = (serviceType: ApiServiceType) => {
  const instance = axios.create({
    baseURL: BASE_URLS[serviceType],
    withCredentials: true,
  });

  // interceptor request with authorization beared
  instance.interceptors.request.use(
    (config) => {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // interceptor response + error 401 handler (not authorized - refresh token expired)
  instance.interceptors.response.use(
    (response) => {
      console.log(`[API RESPONSE - ${serviceType}]`, response.data);
      return response;
    },
    async (error: AxiosError) => {
      console.error(`[API ERROR - ${serviceType}]`, error.response?.data || error.message);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const originalRequest = error.config as any;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const userType = getUserType();
          let newAccessToken = '';

          if (userType === UserType.CLIENT) {
            const CLIENT_URL = createAxiosPublicManager(ApiServiceType.CLIENT);
            const response = await CLIENT_URL.post('/auth/clients/refresh-token');
            newAccessToken = response.data.data.accessToken;
          } else if (userType === UserType.MECHANIC) {
            const MECHANIC_URL = createAxiosPublicManager(ApiServiceType.MECHANIC);
            const response = await MECHANIC_URL.post('/auth/mechanics/refresh-token');
            newAccessToken = response.data.data.accessToken;
          } else {
            throw new Error('Unknown user type for refresh');
          }

          saveAccessToken(newAccessToken);

          // set new token as authorization bearer
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // retry original request
          return instance(originalRequest);

        } catch (refreshError) {
          console.error('Refreshing access token failed, logging out', refreshError);
          clearAuthData(); // cookie deletion not needed because refresh token is expired in this situation
          window.location.href = '/login'; // redirect to login
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};
