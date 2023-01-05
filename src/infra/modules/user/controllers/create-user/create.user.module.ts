import { Module } from '@nestjs/common';
import { CreateUserController } from './create.user.controller';
import { DatabaseModule } from '@infra/database/database.module';
import { PrismaUserRepository } from '@infra/database/prisma/repositories/prisma.user.repository';
import { DbCreateUserUseCase } from '@data/usecases/db-create-user';
import { BcryptHashAdapter } from '@infra/protocols/hash/bcrypt.hash.adapter';
import { NodeMailerAdapter } from '@infra/protocols/mail/mail';
import { CodeTemporary } from '@infra/protocols/code-temporary/code-temporary';
import {
  CODE_TEMPORARY_SERVICE,
  CREATE_USER_USE_CASE,
  HASH_SERVICE,
  MAIL_SERVICE,
  USER_REPOSITORY,
} from '../../user.providers';
import { DbCreateUserUseCaseModule } from './usecase.module';

// @Module({
//   imports: [DatabaseModule],
//   controllers: [CreateUserController],
//   providers: [
//     {
//       provide: CREATE_USER_USE_CASE,
//       useClass: DbCreateUserUseCase,
//     },
//     {
//       provide: USER_REPOSITORY,
//       useClass: PrismaUserRepository,
//     },
//     {
//       provide: HASH_SERVICE,
//       useClass: BcryptHashAdapter,
//     },
//     {
//       provide: MAIL_SERVICE,
//       useClass: NodeMailerAdapter,
//     },
//     {
//       provide: CODE_TEMPORARY_SERVICE,
//       useClass: CodeTemporary,
//     },
//   ],
// })
// export class CreateUserModule {}

@Module({
  imports: [DbCreateUserUseCaseModule],
  controllers: [CreateUserController],
  providers: [
    {
      provide: CREATE_USER_USE_CASE,
      useClass: DbCreateUserUseCase,
    },
  ],
})
export class CreateUserModule {}
