import { Module } from '@nestjs/common';
import { CreateUserController } from './create.user.controller';
import { DbCreateUserUseCase } from '@data/usecases/user/db-create-user';
import {
  CODE_TEMPORARY_SERVICE,
  CREATE_USER_USE_CASE,
  HASH_SERVICE,
  MAIL_SERVICE,
  USER_REPOSITORY,
} from '../../user.providers';
import { DbCreateUserUseCaseModule } from './usecase-module/db.usecase.module';
import { IUserRepository } from '@data/repositories/user-repository';
import { IHash } from '@data/protocols/hash';
import { IMail } from '@data/protocols/mail';
import { ICodeTemporary } from '@data/protocols/code-temporary';

@Module({
  imports: [DbCreateUserUseCaseModule],
  controllers: [CreateUserController],
  providers: [
    {
      provide: CREATE_USER_USE_CASE,
      useFactory: (
        userRepository: IUserRepository,
        hashService: IHash,
        mailService: IMail,
        codeTemporaryService: ICodeTemporary,
      ) => {
        return new DbCreateUserUseCase(
          userRepository,
          hashService,
          mailService,
          codeTemporaryService,
        );
      },
      inject: [
        USER_REPOSITORY,
        HASH_SERVICE,
        MAIL_SERVICE,
        CODE_TEMPORARY_SERVICE,
      ],
    },
  ],
})
export class CreateUserModule {}
