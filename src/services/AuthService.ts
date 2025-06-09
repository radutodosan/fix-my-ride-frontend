import { createAxiosPublicManager } from './AxiosManager';
import { ApiServiceType } from '../types/apiServiceType';
import { LoginRequest } from "../types/LoginRequest";
import { JwtResponseClient, JwtResponseMechanic } from "../types/JwtResponse";
import { SignupData } from '../types/SignupRequest';

const CLIENT_URL = createAxiosPublicManager(ApiServiceType.CLIENT);
const MECHANIC_URL = createAxiosPublicManager(ApiServiceType.MECHANIC);

// Signup
export const clientSignup = async (signupData: SignupData) => {
  const response = await CLIENT_URL.post('/auth/signup', signupData);
  return response.data.data;
};

export const mechanicSignup = async (signupData: SignupData) => {
  const response = await MECHANIC_URL.post('/auth/signup', signupData);
  return response.data.data;
};

// Login
export const clientLogin = async (loginData: LoginRequest): Promise<JwtResponseClient> => {
  const response = await CLIENT_URL.post("/auth/login", loginData);
  return response.data.data;
};

export const mechanicLogin = async (loginData: LoginRequest): Promise<JwtResponseMechanic> => {
  const response = await MECHANIC_URL.post("/auth/login", loginData);
  return response.data.data;
};

// Logout
export const clientLogout = async (): Promise<void> => {
  await CLIENT_URL.post('/auth/logout');
};

export const mechanicLogout = async (): Promise<void> => {
  await MECHANIC_URL.post('/auth/logout');
};

// Refresh Tokens
export const refreshClientToken = async () => {
  const response = await CLIENT_URL.post('/auth/refresh-token');
  return response.data.data.accessToken;
};

export const refreshMechanicToken = async () => {
  const response = await MECHANIC_URL.post('/auth/refresh-token');
  return response.data.data.accessToken;
};