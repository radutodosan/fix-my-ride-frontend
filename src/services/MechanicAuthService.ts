import axios from "axios";

const MECHANIC_API_URL = "http://localhost:8082"; // backend mechanics service

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
}

export const mechanicLogin = async (loginData: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post(`${MECHANIC_API_URL}/auth/mechanics/login`, loginData);
  return response.data.data;
};
