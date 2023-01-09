import { ICodeTemporary } from '@data/protocols/code-temporary';
import { IMail } from '@data/protocols/mail';
import { IUserRepository } from '@data/repositories/user-repository';
import { DbResendAccountVerificationCodeUseCase } from '@data/usecases/user/db-resend-account-verification-code';
import { Module } from '@nestjs/common';
import {
  CODE_TEMPORARY_SERVICE,
  MAIL_SERVICE,
  RESEND_ACCOUNT_VERIFICATION_CODE_USE_CASE,
  USER_REPOSITORY,
} from '../../user.providers';
import { ResendVerificationCodeController } from './resend-verification-code.controller';
import { DbResendAccountVerificationCodeUseCaseModule } from './usecase-module/db.usecase.module';

@Module({
  imports: [DbResendAccountVerificationCodeUseCaseModule],
  controllers: [ResendVerificationCodeController],
  providers: [
    {
      provide: RESEND_ACCOUNT_VERIFICATION_CODE_USE_CASE,
      useFactory: (
        mailService: IMail,
        userRepository: IUserRepository,
        codeTemporaryService: ICodeTemporary,
      ) => {
        return new DbResendAccountVerificationCodeUseCase(
          mailService,
          userRepository,
          codeTemporaryService,
        );
      },
      inject: [MAIL_SERVICE, USER_REPOSITORY, CODE_TEMPORARY_SERVICE],
    },
  ],
})
export class ResendVerificationCodeModule {}
