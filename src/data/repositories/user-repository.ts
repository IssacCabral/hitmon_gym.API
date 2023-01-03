import { IUser } from 'src/domain/entities/user';

export type createUserRepositoryParams = {
  email: string;
  password: string;
  userName: string;
  accountVerificationCode: string;
  accountVerificationCodeExpiresAt: Date;
};

export interface IUserRepository {
  createUser(user: createUserRepositoryParams): Promise<IUser>;
  findUserByEmail(email: string): Promise<IUser | null>;
}
