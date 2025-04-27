import { UserDetails } from "./UserDetails";

export interface JwtResponseClient {
  token: string;
  client: UserDetails;
}

export interface JwtResponseMechanic {
  token: string;
  mechanic: UserDetails
}