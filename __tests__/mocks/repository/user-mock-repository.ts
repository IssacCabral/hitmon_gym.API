import { IUserRepository } from '@data/repositories/user-repository';
import { IUser } from '@domain/entities/user';
import { CreateUserParams } from '@domain/types/user-params';
import { userMock } from '../entities/user-mock';

export const makeUserRepository = (): IUserRepository => {
  class UserRepositoryStub implements IUserRepository {
    createUser(user: CreateUserParams): Promise<IUser> {
      return Promise.resolve(userMock);
    }
    findUserByEmail(email: string): Promise<IUser> {
      return Promise.resolve(null);
    }
    findUserByUserName(username: string): Promise<IUser> {
      return Promise.resolve(null);
    }
  }
  return new UserRepositoryStub();
};
