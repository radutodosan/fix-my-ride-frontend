import { createAxiosPrivateManager } from './AxiosManager';
import { ApiServiceType } from '../types/apiServiceType';
import { CreateCarRequest } from '../types/AddCarRequest';

const CARS_URL = createAxiosPrivateManager(ApiServiceType.CLIENT);

// Get all cars for current client
export const getClientCars = async () => {
  const response = await CARS_URL.get('/client/cars/my-cars');
  return response.data.data;
};

// Add a car
export const addCar = async (carData: CreateCarRequest) => {
  const response = await CARS_URL.post('/client/cars/add', carData);
  return response.data.data;
};

// Update a car
export const updateCar = async (carId: number, carData: CreateCarRequest) => {
  const response = await CARS_URL.put(`/client/cars/update-car/${carId}`, carData);
  return response.data.data;
};


// Delete a car
export const deleteCar = async (carId: number) => {
  await CARS_URL.delete(`/client/cars/delete-car/${carId}`);
};
