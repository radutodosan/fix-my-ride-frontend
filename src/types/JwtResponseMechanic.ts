import { User } from "./User";

export interface JwtResponseMechanic {
  token: string;
  mechanic: User
}