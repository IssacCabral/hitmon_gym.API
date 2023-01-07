import { Module } from '@nestjs/common';
import { CreateTokenResetPasswordModule } from './controllers/create-token-reset-password/create.token.reset.password.module';
import { ResetPasswordModule } from './controllers/reset-password/reset.password.module';

@Module({
  imports: [CreateTokenResetPasswordModule, ResetPasswordModule],
  exports: [AuthModule],
})
export class AuthModule {}
