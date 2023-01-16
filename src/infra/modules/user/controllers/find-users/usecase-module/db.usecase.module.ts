import { DatabaseModule } from '@infra/database/database.module';
import { PrismaUserRepository } from '@infra/database/prisma/repositories/prisma.user.repository';
import { USER_REPOSITORY } from '@infra/modules/user/user.providers';
import { Module, Provider } from '@nestjs/common';

const providers: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useClass: PrismaUserRepository,
  },
];

@Module({
  imports: [DatabaseModule],
  providers: [...providers],
  exports: [...providers],
})
export class DbFindUsersUseCaseModule {}
