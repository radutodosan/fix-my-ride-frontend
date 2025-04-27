import { createAxiosPrivateManager } from './AxiosManager';
import { ApiServiceType } from '../types/apiServiceType';
import { CreateCarRequest } from '../types/AddCarRequest';

const CAR_URL = createAxiosPrivateManager(ApiServiceType.CLIENT);

// Get all cars for current client
export const getClientCars = async () => {
  const response = await CAR_URL.get('/client/cars/my-cars');
  return response.data.data;
};

// Add a car
export const addCar = async (carData: CreateCarRequest) => {
  const response = await CAR_URL.post('/client/cars/add-car', carData);
  return response.data.data;
};

// Delete a car
export const deleteCar = async (carId: number) => {
  await CAR_URL.delete(`/client/cars/delete-car/${carId}`);
};
