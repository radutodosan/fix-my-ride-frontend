import { createAxiosPrivateManager } from './AxiosManager';
import { ApiServiceType } from '../types/apiServiceType';
import { UserDetails } from '../types/UserDetails';
import { ChangeEmailRequest, ChangePasswordRequest } from '../types/ChangeInfoRequest';

const CLIENT_URL = createAxiosPrivateManager(ApiServiceType.CLIENT);


export const getClientProfile = async (): Promise<UserDetails> => {
  const response = await CLIENT_URL.get('/auth/clients/me');
  return response.data.data;
};

export const changePassword = async (data: ChangePasswordRequest) => {
  const response = await CLIENT_URL.post('/clients/details/change-password', data);
  return response.data.message;
};

export const changeEmail = async (data: ChangeEmailRequest) => {
  const response = await CLIENT_URL.post('/clients/details/change-email', data);
  return response.data.message;
};

export const getAllMechanics = async () => {
  const response = await CLIENT_URL.get('/client/mechanics');
  return response.data.data;
};