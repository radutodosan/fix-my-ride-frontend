import { createAxiosResponseManager } from './AxiosResponseManager';
import { ApiServiceType } from '../types/ApiServiceType';
import { LoginRequest } from "../types/LoginRequest";
import { JwtResponseClient, JwtResponseMechanic } from "../types/JwtResponse";

const CLIENT_URL = createAxiosResponseManager(ApiServiceType.CLIENT);
const MECHANIC_URL = createAxiosResponseManager(ApiServiceType.MECHANIC);

interface SignupData {
  username: string;
  email: string;
  password: string;
}

export const clientSignup = async (signupData: SignupData) => {
  const response = await CLIENT_URL.post('/auth/clients/signup', signupData);
  return response.data.data;
};

export const mechanicSignup = async (signupData: SignupData) => {
  const response = await MECHANIC_URL.post('/auth/mechanics/signup', signupData);
  return response.data.data;
};

export const clientLogin = async (loginData: LoginRequest): Promise<JwtResponseClient> => {
  const response = await CLIENT_URL.post("/auth/clients/login", loginData);
  return response.data.data;
};

export const mechanicLogin = async (loginData: LoginRequest): Promise<JwtResponseMechanic> => {
  const response = await MECHANIC_URL.post("/auth/mechanics/login", loginData);
  return response.data.data;
};