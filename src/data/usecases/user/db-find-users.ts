import { IUserRepository } from '@data/repositories/user-repository';
import { IUser } from '@domain/entities/user';
import {
  PaginationParams,
  PaginationData,
} from '@domain/types/pagination-params';
import { IFindUsersUseCase } from '@domain/usecases/user/find-users';
import { USER_REPOSITORY } from '@infra/modules/user/user.providers';
import { Inject } from '@nestjs/common';

export class DbFindUsersUseCase implements IFindUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(pagination: PaginationParams): Promise<PaginationData<IUser>> {
    const users = await this.userRepository.findManyUsers(pagination);
    return users;
  }
}
