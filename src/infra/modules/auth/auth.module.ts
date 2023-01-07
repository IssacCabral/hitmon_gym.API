import { Module } from '@nestjs/common';
import { CreateTokenResetPasswordModule } from './controllers/create-token-reset-password/create.token.reset.password.module';

@Module({
  imports: [CreateTokenResetPasswordModule],
  exports: [AuthModule],
})
export class AuthModule {}
