import { IRole } from '@domain/entities/role';
import { IUser, RegistrationStep } from '../entities/user';

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

export type UpdateUserParams = {
  email?: string;
  password?: string;
  username?: string;
  registrationStep?: RegistrationStep;
  accountVerificationCode?: string;
  accountVerificationCodeExpiresAt?: Date;
};
