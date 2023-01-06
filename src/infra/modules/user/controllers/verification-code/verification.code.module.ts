import { DbCheckAccountVerificationCodeUseCase } from '@data/usecases/db-check-account-verification-code';
import { Module } from '@nestjs/common';
import { CHECK_ACCOUNT_VERIFICATION_CODE_USE_CASE } from '../../user.providers';
import { DbCheckAccountVerificationCodeUseCaseModule } from './usecase-module/db.usecase.module';
import { VerificationCodeController } from './verification-code.controller';

@Module({
  imports: [DbCheckAccountVerificationCodeUseCaseModule],
  controllers: [VerificationCodeController],
  providers: [
    {
      provide: CHECK_ACCOUNT_VERIFICATION_CODE_USE_CASE,
      useClass: DbCheckAccountVerificationCodeUseCase,
    },
  ],
})
export class VerificationCodeModule {}
