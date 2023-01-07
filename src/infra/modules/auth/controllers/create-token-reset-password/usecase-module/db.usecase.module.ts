import { DatabaseModule } from '@infra/database/database.module';
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
    useClass: PrismaUserRepository,
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
export class DbCreateTokenResetPasswordUseCaseModule {}
