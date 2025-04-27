import { createAxiosResponseManager } from "./AxiosResponseManager";
import { ApiServiceType } from "../types/apiServiceType";
import { LoginRequest } from "../types/LoginRequest";
import { JwtResponseClient } from "../types/JwtResponseClient";

const CLIENT_URL = createAxiosResponseManager(ApiServiceType.CLIENT);


export const clientLogin = async (loginData: LoginRequest): Promise<JwtResponseClient> => {
  const response = await CLIENT_URL.post("/auth/clients/login", loginData);
  return response.data.data;
};
