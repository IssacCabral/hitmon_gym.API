import { DbAuthUseCase } from '@data/usecases/auth/db-auth';
import { Module } from '@nestjs/common';
import { AUTH_USE_CASE } from '../../auth.providers';
import { AuthenticationController } from './authentication.controller';
import { DbAuthUseCaseModule } from './usecase-module/db.usecase.module';

@Module({
  imports: [DbAuthUseCaseModule],
  controllers: [AuthenticationController],
  providers: [
    {
      provide: AUTH_USE_CASE,
      useClass: DbAuthUseCase,
    },
  ],
})
export class AuthenticationModule {}
