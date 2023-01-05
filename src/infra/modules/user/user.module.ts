import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DatabaseModule } from '@infra/database/database.module';
import { PrismaUserRepository } from '@infra/database/prisma/repositories/prisma.user.repository';
import { DbCreateUserUseCase } from '@data/usecases/db-create-user';
import { ProtocolsModule } from '@infra/protocols/protocols.module';
import { BcryptHashAdapter } from '@infra/protocols/hash/bcrypt.hash.adapter';
import { NodeMailerAdapter } from '@infra/protocols/mail/mail';
import { CodeTemporary } from '@infra/protocols/code-temporary/code-temporary';
import {
  CHECK_ACCOUNT_VERIFICATION_CODE_USE_CASE,
  CODE_TEMPORARY_SERVICE,
  CREATE_USER_USE_CASE,
  DATE_SERVICE,
  HASH_SERVICE,
  MAIL_SERVICE,
  USER_REPOSITORY,
} from './user.providers';
import { MomentAdapter } from '@infra/protocols/date/moment-adapter';
import { DbCheckAccountVerificationCodeUseCase } from '@data/usecases/db-check-account-verification-code';

@Module({
  imports: [DatabaseModule, ProtocolsModule],
  controllers: [UserController],
  providers: [
    {
      provide: CREATE_USER_USE_CASE,
      useClass: DbCreateUserUseCase,
    },
    {
      provide: CHECK_ACCOUNT_VERIFICATION_CODE_USE_CASE,
      useClass: DbCheckAccountVerificationCodeUseCase,
    },
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
    {
      provide: HASH_SERVICE,
      useClass: BcryptHashAdapter,
    },
    {
      provide: MAIL_SERVICE,
      useClass: NodeMailerAdapter,
    },
    {
      provide: CODE_TEMPORARY_SERVICE,
      useClass: CodeTemporary,
    },
    {
      provide: DATE_SERVICE,
      useClass: MomentAdapter,
    },
  ],
})
export class UserModule {}
