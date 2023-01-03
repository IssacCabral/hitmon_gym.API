import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { PrismaUserRepository } from 'src/infra/database/prisma/repositories/prisma.user.repository';
import { DbCreateUserUseCase } from '@data/usecases/db-create-user';
import { ProtocolsModule } from 'src/infra/protocols/protocols.module';
import { BcryptHashAdapter } from 'src/infra/protocols/hash/bcrypt.hash.adapter';
import { NodeMailerAdapter } from 'src/infra/protocols/mail/mail';
import { CodeTemporary } from 'src/infra/protocols/code-temporary/code-temporary';
import {
  CODE_TEMPORARY_SERVICE,
  CREATE_USER_USE_CASE,
  HASH_SERVICE,
  MAIL_SERVICE,
  USER_REPOSITORY,
} from './user.providers';

@Module({
  imports: [DatabaseModule, ProtocolsModule],
  controllers: [UserController],
  providers: [
    {
      provide: CREATE_USER_USE_CASE,
      useClass: DbCreateUserUseCase,
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
  ],
})
export class UserModule {}
