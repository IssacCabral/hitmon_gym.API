import { IUser } from '../entities/user';

export type CreateUserParams = Omit<
  IUser,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'registrationStep'
  | 'accountVerificationCode'
  | 'accountVerificationCodeExpiresAt'
  | 'roles'
>;
export type CreateUserReturns = {
  user: Partial<Omit<IUser, 'password'>>;
};
