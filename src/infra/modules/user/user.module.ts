import { Module } from '@nestjs/common';
import { CreateUserModule } from './controllers/create-user/create.user.module';
import { VerificationCodeModule } from './controllers/verification-code/verification.code.module';
import { ResendVerificationCodeModule } from './controllers/resend-verification-code/resend.verification.code.module';
import { FindUsersModule } from './controllers/find-users/find.users.module';

@Module({
  imports: [
    CreateUserModule,
    VerificationCodeModule,
    ResendVerificationCodeModule,
    FindUsersModule,
  ],
  exports: [UserModule],
})
export class UserModule {}
