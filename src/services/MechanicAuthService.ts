import { createAxiosResponseManager } from "./AxiosResponseManager";
import { ApiServiceType } from "../types/apiServiceType";
import { LoginRequest } from "../types/LoginRequest";
import { JwtResponseMechanic } from "../types/JwtResponseMechanic";

const CLIENT_URL = createAxiosResponseManager(ApiServiceType.MECHANIC);



export const mechanicLogin = async (loginData: LoginRequest): Promise<JwtResponseMechanic> => {
  const response = await CLIENT_URL.post("/auth/mechanics/login", loginData);
  return response.data.data;
};
