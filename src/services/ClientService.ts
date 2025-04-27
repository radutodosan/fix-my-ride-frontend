import { createAxiosPrivateManager } from './AxiosManager';
import { ApiServiceType } from '../types/apiServiceType';

const clientPrivateApi = createAxiosPrivateManager(ApiServiceType.CLIENT);

export interface ClientDetails {
  username: string;
  email: string;
}

interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

interface ChangeEmailRequest {
  password: string;
  newEmail: string;
}

export const getClientProfile = async (): Promise<ClientDetails> => {
  const response = await clientPrivateApi.get('/auth/clients/me');
  return response.data.data;
};

export const changePassword = async (data: ChangePasswordRequest) => {
  const response = await clientPrivateApi.post('/clients/details/change-password', data);
  return response.data.message;
};

export const changeEmail = async (data: ChangeEmailRequest) => {
  const response = await clientPrivateApi.post('/clients/details/change-email', data);
  return response.data.message;
};

export const getAllMechanics = async () => {
  const response = await clientPrivateApi.get('/client/mechanics');
  return response.data.data;
};