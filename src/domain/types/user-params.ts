import { IUser } from '../entities/user';

export type CreateUserParams = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>;
export type CreateUserReturns = {
  user: Omit<IUser, 'password'>;
};
