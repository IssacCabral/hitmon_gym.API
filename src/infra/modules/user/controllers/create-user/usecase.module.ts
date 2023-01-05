// import { DbCreateUserUseCase } from '@data/usecases/db-create-user';
// import { DatabaseModule } from '@infra/database/database.module';
// import { PrismaUserRepository } from '@infra/database/prisma/repositories/prisma.user.repository';
// import { CodeTemporary } from '@infra/protocols/code-temporary/code-temporary';
// import { BcryptHashAdapter } from '@infra/protocols/hash/bcrypt.hash.adapter';
// import { NodeMailerAdapter } from '@infra/protocols/mail/mail';
// import { ProtocolsModule } from '@infra/protocols/protocols.module';
// import { Module } from '@nestjs/common';
// import {
//   CODE_TEMPORARY_SERVICE,
//   HASH_SERVICE,
//   MAIL_SERVICE,
//   USER_REPOSITORY,
// } from '../../user.providers';

// @Module({
//   imports: [ProtocolsModule, DatabaseModule],
//   providers: [
//     DbCreateUserUseCase,
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
//   exports: [DbCreateUserUseCaseModule],
// })
// export class DbCreateUserUseCaseModule {}
