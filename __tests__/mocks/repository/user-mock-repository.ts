import { IUserRepository } from 'src/data/repositories/user-repository';
import { IUser } from 'src/domain/entities/user';
import { CreateUserParams } from 'src/domain/types/user-params';
import { userMock } from '../entities/user-mock';

export const makeUserRepository = (): IUserRepository => {
  class UserRepositoryStub implements IUserRepository {
    createUser(user: CreateUserParams): Promise<IUser> {
      return Promise.resolve(userMock);
    }
    findUserByEmail(email: string): Promise<IUser> {
      return Promise.resolve(userMock);
    }
  }
  return new UserRepositoryStub();
};
