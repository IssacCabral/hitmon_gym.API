import { DatabaseModule } from '@infra/database/database.module';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { PrismaUserRepository } from '@infra/database/prisma/repositories/prisma.user.repository';
import {
  CODE_TEMPORARY_SERVICE,
  MAIL_SERVICE,
  USER_REPOSITORY,
} from '@infra/modules/user/user.providers';
import { CodeTemporary } from '@infra/protocols/code-temporary/code-temporary';
import { NodeMailerAdapter } from '@infra/protocols/mail/mail';
import { Module, Provider } from '@nestjs/common';

const providers: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useFactory: (prismaService: PrismaService) => {
      return new PrismaUserRepository(prismaService);
    },
    inject: [{ token: 'PRISMA_SERVICE', optional: false }],
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
export class DbCreateTokenResetPasswordUseCaseModule {}
