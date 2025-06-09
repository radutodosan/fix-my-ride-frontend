import { createAxiosPrivateManager } from './AxiosManager';
import { ApiServiceType } from '../types/apiServiceType';
import { ChangeEmailRequest, ChangePasswordRequest } from '../types/ChangeInfoRequest';

const MECHANIC_URL = createAxiosPrivateManager(ApiServiceType.MECHANIC);


export const getMechanicProfile = async () => {
  const response = await MECHANIC_URL.get('auth/me');
  return response.data.data;
};

export const changeMechanicPassword = async (data: ChangePasswordRequest) => {
  const response = await MECHANIC_URL.post('/details/change-password', data);
  return response.data.data;
};

export const changeMechanicEmail = async (data: ChangeEmailRequest) => {
  const response = await MECHANIC_URL.post('/details/change-email', data);
  return response.data.data;
};
