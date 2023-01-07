import { DatabaseModule } from '@infra/database/database.module';
import { PrismaUserRepository } from '@infra/database/prisma/repositories/prisma.user.repository';
import {
  DATE_SERVICE,
  HASH_SERVICE,
  USER_REPOSITORY,
} from '@infra/modules/user/user.providers';
import { MomentAdapter } from '@infra/protocols/date/moment-adapter';
import { BcryptHashAdapter } from '@infra/protocols/hash/bcrypt.hash.adapter';
import { Module, Provider } from '@nestjs/common';

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
    provide: DATE_SERVICE,
    useClass: MomentAdapter,
  },
];

@Module({
  imports: [DatabaseModule],
  providers: [...providers],
  exports: [...providers],
})
export class DbResetPasswordUseCaseModule {}
