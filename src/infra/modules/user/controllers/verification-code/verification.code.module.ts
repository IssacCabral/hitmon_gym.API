import { IDate } from '@data/protocols/date';
import { IUserRepository } from '@data/repositories/user-repository';
import { DbCheckAccountVerificationCodeUseCase } from '@data/usecases/user/db-check-account-verification-code';
import { Module } from '@nestjs/common';
import {
  CHECK_ACCOUNT_VERIFICATION_CODE_USE_CASE,
  DATE_SERVICE,
  USER_REPOSITORY,
} from '../../user.providers';
import { DbCheckAccountVerificationCodeUseCaseModule } from './usecase-module/db.usecase.module';
import { VerificationCodeController } from './verification-code.controller';

@Module({
  imports: [DbCheckAccountVerificationCodeUseCaseModule],
  controllers: [VerificationCodeController],
  providers: [
    {
      provide: CHECK_ACCOUNT_VERIFICATION_CODE_USE_CASE,
      useFactory: (userRepository: IUserRepository, dateService: IDate) => {
        return new DbCheckAccountVerificationCodeUseCase(
          userRepository,
          dateService,
        );
      },
      inject: [USER_REPOSITORY, DATE_SERVICE],
    },
  ],
})
export class VerificationCodeModule {}
