import { ICodeTemporary } from '@data/protocols/code-temporary';
import { IMail } from '@data/protocols/mail';
import { IUserRepository } from '@data/repositories/user-repository';
import { DbCreateTokenResetPasswordUseCase } from '@data/usecases/auth/db-create-token-reset-password';
import { BusinessError } from '@domain/errors/business-error';
import { userMock } from '@tests/mocks/entities/user-mock';
import { makeUserRepository } from '@tests/mocks/repository/user-mock-repository';
import { makeCodeTemporaryService } from '@tests/mocks/usecase/protocols/code-temporary-mock';
import { makeMailService } from '@tests/mocks/usecase/protocols/mail-mock';

interface SutTypes {
  usecase: DbCreateTokenResetPasswordUseCase;
  repository: IUserRepository;
  mailService: IMail;
  codeTemporaryService: ICodeTemporary;
}

const makeSut = (): SutTypes => {
  const repository = makeUserRepository();
  const mailService = makeMailService();
  const codeTemporaryService = makeCodeTemporaryService();
  const usecase = new DbCreateTokenResetPasswordUseCase(
    repository,
    codeTemporaryService,
    mailService,
  );
  return {
    usecase,
    repository,
    mailService,
    codeTemporaryService,
  };
};

describe('# UseCase - create token reset password', () => {
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

  it('Should call findUserByEmail with correct email', async () => {
    const { usecase, repository } = makeSut();
    const findByEmailSpy = jest
      .spyOn(repository, 'findUserByEmail')
      .mockResolvedValueOnce(userMock);
    await usecase.execute('any_email');
    expect(findByEmailSpy).toHaveBeenCalledWith('any_email');
  });
});
