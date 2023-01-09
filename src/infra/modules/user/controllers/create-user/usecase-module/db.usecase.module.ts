import { DatabaseModule } from '@infra/database/database.module';
import { PrismaService } from '@infra/database/prisma/prisma.service';
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
    useFactory: (prismaService: PrismaService) => {
      return new PrismaUserRepository(prismaService);
    },
    inject: [{ token: 'PRISMA_SERVICE', optional: false }],
  },
  {
    provide: HASH_SERVICE,
    useFactory: () => {
      return new BcryptHashAdapter();
    },
  },
  {
    provide: MAIL_SERVICE,
    useFactory: () => {
      return new NodeMailerAdapter();
    },
  },
  {
    provide: CODE_TEMPORARY_SERVICE,
    useFactory: () => {
      return new CodeTemporary();
    },
  },
];

@Module({
  imports: [DatabaseModule],
  providers: [...providers],
  exports: [...providers],
})
export class DbCreateUserUseCaseModule {}
