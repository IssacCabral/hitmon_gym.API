import { DbFindUsersUseCase } from '@data/usecases/user/db-find-users';
import { Module } from '@nestjs/common';
import { FIND_USERS_USE_CASE } from '../../user.providers';
import { FindUsersController } from './find.users.controller';
import { DbFindUsersUseCaseModule } from './usecase-module/db.usecase.module';

@Module({
  imports: [DbFindUsersUseCaseModule],
  controllers: [FindUsersController],
  providers: [
    {
      provide: FIND_USERS_USE_CASE,
      useClass: DbFindUsersUseCase,
    },
  ],
})
export class FindUsersModule {}
