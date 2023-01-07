import { DbResendAccountVerificationCodeUseCase } from '@data/usecases/db-resend-account-verification-code';
import { Module } from '@nestjs/common';
import { RESEND_ACCOUNT_VERIFICATION_CODE_USE_CASE } from '../../user.providers';
import { ResendVerificationCodeController } from './resend-verification-code.controller';
import { DbResendAccountVerificationCodeUseCaseModule } from './usecase-module/db.usecase.module';

@Module({
  imports: [DbResendAccountVerificationCodeUseCaseModule],
  controllers: [ResendVerificationCodeController],
  providers: [
    {
      provide: RESEND_ACCOUNT_VERIFICATION_CODE_USE_CASE,
      useClass: DbResendAccountVerificationCodeUseCase,
    },
  ],
})
export class ResendVerificationCodeModule {}
