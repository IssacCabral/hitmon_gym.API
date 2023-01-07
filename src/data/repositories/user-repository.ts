import { UpdateUserParams } from '@domain/types/user-params';
import { IUser } from '@domain/entities/user';

export type createUserRepositoryParams = {
  email: string;
  password: string;
  username: string;
  accountVerificationCode: string;
  accountVerificationCodeExpiresAt: Date;
};

export interface IUserRepository {
  createUser(user: createUserRepositoryParams): Promise<IUser>;
  findUserById(id: string): Promise<IUser | null>;
  findUserByEmail(email: string): Promise<IUser | null>;
  findUserByUserName(username: string): Promise<IUser | null>;
  findUserByPasswordResetCode(
    code: string,
    email: string,
  ): Promise<IUser | null>;
  updateUser(id: string, params: UpdateUserParams): Promise<IUser>;
}
