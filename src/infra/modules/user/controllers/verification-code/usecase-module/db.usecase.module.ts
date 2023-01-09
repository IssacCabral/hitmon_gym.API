import { DatabaseModule } from '@infra/database/database.module';
import { PrismaUserRepository } from '@infra/database/prisma/repositories/prisma.user.repository';
import { MomentAdapter } from '@infra/protocols/date/moment-adapter';
import { Module, Provider } from '@nestjs/common';
import {
  DATE_SERVICE,
  USER_REPOSITORY,
} from '@infra/modules/user/user.providers';

const providers: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useClass: PrismaUserRepository,
  },
  {
    provide: DATE_SERVICE,
    useClass: MomentAdapter,
  },
];

@Module({
  imports: [DatabaseModule],
  providers: [...providers],
  exports: [...providers],
})
export class DbCheckAccountVerificationCodeUseCaseModule {}
