import { Module } from '@nestjs/common';
import { CreateUserModule } from './controllers/create-user/create.user.module';
import { VerificationCodeModule } from './controllers/verification-code/verification.code.module';

@Module({
  imports: [CreateUserModule, VerificationCodeModule],
  exports: [UserModule],
})
export class UserModule {}
