import { Module } from '@nestjs/common';
import { CreateUserController } from './create.user.controller';
import { DbCreateUserUseCase } from '@data/usecases/db-create-user';
import { CREATE_USER_USE_CASE } from '../../user.providers';
import { DbCreateUserUseCaseModule } from './usecase-module/db.usecase.module';

@Module({
  imports: [DbCreateUserUseCaseModule],
  controllers: [CreateUserController],
  providers: [
    {
      provide: CREATE_USER_USE_CASE,
      useClass: DbCreateUserUseCase,
    },
  ],
})
export class CreateUserModule {}
