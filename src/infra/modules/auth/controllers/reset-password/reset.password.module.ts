import { IDate } from '@data/protocols/date';
import { IHash } from '@data/protocols/hash';
import { IUserRepository } from '@data/repositories/user-repository';
import { DbResetPasswordUseCase } from '@data/usecases/auth/db-reset-password';
import {
  DATE_SERVICE,
  HASH_SERVICE,
  USER_REPOSITORY,
} from '@infra/modules/user/user.providers';
import { Module } from '@nestjs/common';
import { RESET_PASSWORD_USE_CASE } from '../../auth.providers';
import { ResetPasswordController } from './reset.password.controller';
import { DbResetPasswordUseCaseModule } from './usecase-module/db.usecase.module';

@Module({
  imports: [DbResetPasswordUseCaseModule],
  controllers: [ResetPasswordController],
  providers: [
    {
      provide: RESET_PASSWORD_USE_CASE,
      useFactory: (
        userRepository: IUserRepository,
        hashService: IHash,
        dateService: IDate,
      ) => {
        return new DbResetPasswordUseCase(
          userRepository,
          hashService,
          dateService,
        );
      },
      inject: [USER_REPOSITORY, HASH_SERVICE, DATE_SERVICE],
    },
    {
      provide: RESET_PASSWORD_USE_CASE,
      useFactory: (
        userRepository: IUserRepository,
        hashService: IHash,
        dateService: IDate,
      ) => {
        return new DbResetPasswordUseCase(
          userRepository,
          hashService,
          dateService,
        );
      },
      inject: [USER_REPOSITORY, HASH_SERVICE, DATE_SERVICE],
    },
  ],
})
export class ResetPasswordModule {}
