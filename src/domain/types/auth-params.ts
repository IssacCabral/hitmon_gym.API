import { IUser } from '@domain/entities/user';

export type AuthParams = {
  email: string;
  password: string;
};

export type AuthResult = {
  token: string;
  user: Partial<IUser>;
};
