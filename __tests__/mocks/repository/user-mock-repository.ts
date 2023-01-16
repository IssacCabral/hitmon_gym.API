import { IUserRepository } from '@data/repositories/user-repository';
import { IUser } from '@domain/entities/user';
import {
  PaginationParams,
  PaginationData,
} from '@domain/types/pagination-params';
import { CreateUserParams, UpdateUserParams } from '@domain/types/user-params';
import { userMock, usersMock } from '../entities/user-mock';

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
    findUserById(id: string): Promise<IUser> {
      return Promise.resolve(userMock);
    }
    updateUser(id: string, params: UpdateUserParams): Promise<IUser> {
      return Promise.resolve(userMock);
    }
    findUserByPasswordResetCode(code: string, email: string): Promise<IUser> {
      return Promise.resolve(userMock);
    }
    findManyUsers(
      pagination: PaginationParams,
    ): Promise<PaginationData<IUser>> {
      return Promise.resolve({
        meta: {
          hasNext: true,
          limit: 1,
          page: 1,
          total: 3,
        },
        data: usersMock,
      });
    }
  }
  return new UserRepositoryStub();
};
