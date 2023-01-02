import { IUser } from '../entities/user';

export type CreateUserParams = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>;
export type CreateUserReturns = {};

console.log('Ola amigo');
