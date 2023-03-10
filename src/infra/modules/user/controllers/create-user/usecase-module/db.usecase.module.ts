import { DatabaseModule } from '@infra/database/database.module';
import { PrismaUserRepository } from '@infra/database/prisma/repositories/prisma.user.repository';
import { CodeTemporary } from '@infra/protocols/code-temporary/code-temporary';
import { BcryptHashAdapter } from '@infra/protocols/hash/bcrypt.hash.adapter';
import { NodeMailerAdapter } from '@infra/protocols/mail/mail';
import { Module, Provider } from '@nestjs/common';
import {
  CODE_TEMPORARY_SERVICE,
  HASH_SERVICE,
  MAIL_SERVICE,
  USER_REPOSITORY,
} from '../../../user.providers';

const providers: Provider[] = [
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
];

@Module({
  imports: [DatabaseModule],
  providers: [...providers],
  exports: [...providers],
})
export class DbCreateUserUseCaseModule {}
