import { DbResetPasswordUseCase } from '@data/usecases/auth/db-reset-password';
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
      useClass: DbResetPasswordUseCase,
    },
  ],
})
export class ResetPasswordModule {}
