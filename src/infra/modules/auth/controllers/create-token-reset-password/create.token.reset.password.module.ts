import { DbCreateTokenResetPasswordUseCase } from '@data/usecases/auth/db-create-token-reset-password';
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
      useClass: DbCreateTokenResetPasswordUseCase,
    },
  ],
})
export class CreateTokenResetPasswordModule {}
