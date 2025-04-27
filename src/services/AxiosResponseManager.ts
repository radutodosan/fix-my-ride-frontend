import axios from "axios";
import { ApiServiceType } from "../types/apiServiceType";

// services mapping
const BASE_URLS: Record<ApiServiceType, string> = {
  [ApiServiceType.CLIENT]: "http://localhost:8081",
  [ApiServiceType.MECHANIC]: "http://localhost:8082",
  [ApiServiceType.APPOINTMENT]: "http://localhost:8083",
};


export const createAxiosResponseManager = (serviceType: ApiServiceType) => {
  const instance = axios.create({
    baseURL: BASE_URLS[serviceType],
    withCredentials: true,
  });

  instance.interceptors.response.use(
    (response) => {
      console.log(`[API RESPONSE - ${serviceType}]`, response.data);

      const apiResponse = response.data as { success: boolean; message: string; data: unknown };

      if (!apiResponse.success) {
        console.error(`[API ERROR - ${serviceType}]`, apiResponse.message);
        return Promise.reject(new Error(apiResponse.message || "Unexpected API Error"));
      }

      return response;
    },
    (error) => {
      console.error(`[NETWORK ERROR - ${serviceType}]`, error.response?.data || error.message);
      return Promise.reject(error);
    }
  );

  return instance;
};
