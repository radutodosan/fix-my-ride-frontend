import { User } from "./User";

export interface JwtResponseClient {
  token: string;
  client: User;
}