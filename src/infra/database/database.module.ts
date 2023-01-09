import { USER_REPOSITORY } from '@infra/modules/user/user.providers';
import { Module, Provider } from '@nestjs/common';
import { services } from './prisma';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserRepository } from './prisma/repositories/prisma.user.repository';

const providers: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useFactory: (prismaService: PrismaService) => {
      return new PrismaUserRepository(prismaService);
    },
    inject: [{ token: 'PRISMA_SERVICE', optional: false }],
  },
];
@Module({
  providers: [...services, ...providers],
  exports: [...services, ...providers],
})
export class DatabaseModule {}
