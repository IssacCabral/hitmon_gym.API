import { IUser } from 'src/domain/entities/user';

export type createUserParamsRepository = {
  email: string;
  password: string;
  userName: string;
  cpf: string;
  accountVerificationCode?: string;
  accountVerificationCodeExpiresAt?: Date;
};

export interface IUserRepository {
  createUser(user: createUserParamsRepository): Promise<IUser>;
  findUserByEmail(email: string): Promise<IUser | null>;
}
