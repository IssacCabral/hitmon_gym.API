import { DbCheckAccountVerificationCodeUseCase } from '@data/usecases/db-check-account-verification-code';
import { DatabaseModule } from '@infra/database/database.module';
import { PrismaUserRepository } from '@infra/database/prisma/repositories/prisma.user.repository';
import { MomentAdapter } from '@infra/protocols/date/moment-adapter';
import { Module } from '@nestjs/common';
import {
  CHECK_ACCOUNT_VERIFICATION_CODE_USE_CASE,
  DATE_SERVICE,
  USER_REPOSITORY,
} from '../../user.providers';
import { VerificationCodeController } from './verification-code.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [VerificationCodeController],
  providers: [
    {
      provide: CHECK_ACCOUNT_VERIFICATION_CODE_USE_CASE,
      useClass: DbCheckAccountVerificationCodeUseCase,
    },
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
    {
      provide: DATE_SERVICE,
      useClass: MomentAdapter,
    },
  ],
})
export class VerificationCodeModule {}
