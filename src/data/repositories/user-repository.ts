import { IUser } from 'src/domain/entities/user';
import { CreateUserParams } from 'src/domain/types/user-params';

export interface IUserRepository {
  createUser(user: CreateUserParams): Promise<IUser>;
  findUserByEmail(email: string): Promise<IUser | null>;
}
