import { DatabaseModule } from '@infra/database/database.module';
import { PrismaUserRepository } from '@infra/database/prisma/repositories/prisma.user.repository';
import { JWT_SERVICE } from '@infra/modules/auth/auth.providers';
import {
  HASH_SERVICE,
  USER_REPOSITORY,
} from '@infra/modules/user/user.providers';
import { JwtAdapter } from '@infra/protocols/auth/jwt.adapter';
import { BcryptHashAdapter } from '@infra/protocols/hash/bcrypt.hash.adapter';
import { Module, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants';

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
    provide: JWT_SERVICE,
    useClass: JwtAdapter,
  },
];

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [...providers],
  exports: [...providers],
})
export class DbAuthUseCaseModule {}
