import { DatabaseModule } from '@infra/database/database.module';
import { PrismaService } from '@infra/database/prisma/prisma.service';
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
    provide: DATE_SERVICE,
    useFactory: () => {
      return new MomentAdapter();
    },
  },
];

@Module({
  imports: [DatabaseModule],
  providers: [...providers],
  exports: [...providers],
})
export class DbResetPasswordUseCaseModule {}
