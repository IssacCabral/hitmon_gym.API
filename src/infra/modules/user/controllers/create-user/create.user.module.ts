import { Module } from '@nestjs/common';
import { CreateUserController } from './create.user.controller';
import { DbCreateUserUseCase } from '@data/usecases/db-create-user';
import { CREATE_USER_USE_CASE } from '../../user.providers';
import { DbCreateUserUseCaseModule } from './usecase-module/db.usecase.module';

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
