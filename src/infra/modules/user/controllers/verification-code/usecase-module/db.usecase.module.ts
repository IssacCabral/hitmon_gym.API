import { DatabaseModule } from '@infra/database/database.module';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { PrismaUserRepository } from '@infra/database/prisma/repositories/prisma.user.repository';
import { MomentAdapter } from '@infra/protocols/date/moment-adapter';
import { Module, Provider } from '@nestjs/common';
import { DATE_SERVICE, USER_REPOSITORY } from '../../../user.providers';

const providers: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useFactory: (prismaService: PrismaService) => {
      return new PrismaUserRepository(prismaService);
    },
    inject: [{ token: 'PRISMA_SERVICE', optional: false }],
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
export class DbCheckAccountVerificationCodeUseCaseModule {}
