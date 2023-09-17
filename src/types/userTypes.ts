export interface RegisterUserParams {
  email: string;
  password: string;
  name: string;
  cpf: string;
  address: string;
}

export interface LoginUserParams {
  email: string;
  password: string;
}
