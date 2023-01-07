import { ICodeTemporary } from '@data/protocols/code-temporary';
import { IMail } from '@data/protocols/mail';
import { DbCreateTokenResetPasswordUseCase } from '@data/usecases/auth/db-create-token-reset-password';
import { ICreateTokenResetPasswordUseCase } from '@domain/usecases/auth/create-token-reset-password';

interface SutTypes {
  usecase: DbCreateTokenResetPasswordUseCase;
  repository: ICreateTokenResetPasswordUseCase;
  mailService: IMail;
  codeTemporaryService: ICodeTemporary;
}
