import { AddressParams } from "./addressType";

export interface RegisterUserParams {
  email: string;
  password: string;
  name: string;
  cpf: string;
  address: AddressParams;
}

export interface LoginUserParams {
  email: string;
  password: string;
}
