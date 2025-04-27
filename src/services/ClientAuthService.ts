import axios from "axios";

const CLIENT_API_URL = "http://localhost:8081"; // backend users service

interface LoginRequest {
    username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
}

export const clientLogin = async (loginData: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post(`${CLIENT_API_URL}/auth/clients/login`, loginData);
  return response.data.data;
};
