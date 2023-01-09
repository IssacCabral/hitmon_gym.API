import { ICodeTemporary } from '@data/protocols/code-temporary';
import { IMail } from '@data/protocols/mail';
import { IUserRepository } from '@data/repositories/user-repository';
import { DbCreateTokenResetPasswordUseCase } from '@data/usecases/auth/db-create-token-reset-password';
import {
  CODE_TEMPORARY_SERVICE,
  MAIL_SERVICE,
  USER_REPOSITORY,
} from '@infra/modules/user/user.providers';
import { Module } from '@nestjs/common';
import { CREATE_TOKEN_RESET_PASSWORD_USE_CASE } from '../../auth.providers';
import { CreateTokenResetPasswordController } from './create.token.reset.password.controller';
import { DbCreateTokenResetPasswordUseCaseModule } from './usecase-module/db.usecase.module';

@Module({
  imports: [DbCreateTokenResetPasswordUseCaseModule],
  controllers: [CreateTokenResetPasswordController],
  providers: [
    {
      provide: CREATE_TOKEN_RESET_PASSWORD_USE_CASE,
      useFactory: (
        userRepository: IUserRepository,
        codeTemporary: ICodeTemporary,
        mailService: IMail,
      ) => {
        return new DbCreateTokenResetPasswordUseCase(
          userRepository,
          codeTemporary,
          mailService,
        );
      },
      inject: [USER_REPOSITORY, CODE_TEMPORARY_SERVICE, MAIL_SERVICE],
    },
  ],
})
export class CreateTokenResetPasswordModule {}
