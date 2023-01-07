import { ICodeTemporary } from '@data/protocols/code-temporary';
import { IMail } from '@data/protocols/mail';
import { IUserRepository } from '@data/repositories/user-repository';
import { DbResendAccountVerificationCodeUseCase } from '@data/usecases/db-resend-account-verification-code';
import { BusinessError } from '@domain/errors/business-error';
import { makeUserRepository } from '@tests/mocks/repository/user-mock-repository';
import { makeCodeTemporaryService } from '@tests/mocks/usecase/protocols/code-temporary-mock';
import { makeMailService } from '@tests/mocks/usecase/protocols/mail-mock';

interface SutTypes {
  usecase: DbResendAccountVerificationCodeUseCase;
  repository: IUserRepository;
  mailService: IMail;
  codeTemporaryService: ICodeTemporary;
}

const makeSut = (): SutTypes => {
  const repository = makeUserRepository();
  const mailService = makeMailService();
  const codeTemporaryService = makeCodeTemporaryService();
  const usecase = new DbResendAccountVerificationCodeUseCase(
    mailService,
    repository,
    codeTemporaryService,
  );
  return {
    repository,
    mailService,
    codeTemporaryService,
    usecase,
  };
};

describe('# UseCase - resend account verification code', () => {
  it('Should throw a BusinessError if user is not found', async () => {
    const { usecase, repository } = makeSut();
    jest.spyOn(repository, 'findUserByEmail').mockResolvedValueOnce(null);
    const promise = usecase.execute('any_email');
    await expect(promise).rejects.toThrowError(
      new BusinessError('User is not found', 404),
    );
  });

  it('Should throw if findUserByEmail throws', async () => {
    const { usecase, repository } = makeSut();
    jest.spyOn(repository, 'findUserByEmail').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = usecase.execute('any_email');
    await expect(promise).rejects.toThrow();
  });
});
