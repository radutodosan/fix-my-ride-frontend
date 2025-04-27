import axios from 'axios';
import { ApiServiceType } from '../types/apiServiceType';

const BASE_URLS: Record<ApiServiceType, string> = {
  [ApiServiceType.CLIENT]: 'http://localhost:8081',
  [ApiServiceType.MECHANIC]: 'http://localhost:8082',
  [ApiServiceType.APPOINTMENT]: 'http://localhost:8083',
};

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

export const createAxiosPrivateManager = (serviceType: ApiServiceType) => {
  const instance = axios.create({
    baseURL: BASE_URLS[serviceType],
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

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
