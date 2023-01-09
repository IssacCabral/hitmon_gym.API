import { Module } from '@nestjs/common';
import { CreateUserModule } from './controllers/create-user/create.user.module';
import { VerificationCodeModule } from './controllers/verification-code/verification.code.module';
import { ResendVerificationCodeModule } from './controllers/resend-verification-code/resend.verification.code.module';

@Module({
  imports: [
    CreateUserModule,
    VerificationCodeModule,
    ResendVerificationCodeModule,
  ],
  exports: [UserModule],
})
export class UserModule {}

console.log('ola');
