import { User } from "./User";

export interface JwtResponseClient {
  token: string;
  client: User;
}

export interface JwtResponseMechanic {
  token: string;
  mechanic: User
}