import { ICodeTemporary } from '@data/protocols/code-temporary';
import { IMail } from '@data/protocols/mail';
import { IUserRepository } from '@data/repositories/user-repository';
import { DbResendAccountVerificationCodeUseCase } from '@data/usecases/db-resend-account-verification-code';
import { IUser } from '@domain/entities/user';
import { BusinessError } from '@domain/errors/business-error';
import { userMock } from '@tests/mocks/entities/user-mock';
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

  it('Should call findUserByEmail with correct email', async () => {
    const { usecase, repository } = makeSut();
    const findByEmailSpy = jest
      .spyOn(repository, 'findUserByEmail')
      .mockResolvedValueOnce(userMock);
    await usecase.execute('any_email');
    expect(findByEmailSpy).toHaveBeenCalledWith('any_email');
  });

  it('Should codeTemporaryService to have been called', async () => {
    const { usecase, codeTemporaryService, repository } = makeSut();
    const codeTemporaryServiceSpy = jest.spyOn(
      codeTemporaryService,
      'generateCode',
    );

    jest.spyOn(repository, 'findUserByEmail').mockResolvedValueOnce(userMock);

    await usecase.execute('any_email');
    expect(codeTemporaryServiceSpy).toHaveBeenCalled();
  });

  it('Should throw if codeTemporaryService throws', async () => {
    const { usecase, codeTemporaryService, repository } = makeSut();

    jest.spyOn(repository, 'findUserByEmail').mockResolvedValueOnce(userMock);

    jest
      .spyOn(codeTemporaryService, 'generateCode')
      .mockImplementationOnce(() => {
        throw new Error();
      });

    const promise = usecase.execute('any_email');
    await expect(promise).rejects.toThrow();
  });

  it('Should updateUser to have been called', async () => {
    const { usecase, repository } = makeSut();

    jest.spyOn(repository, 'findUserByEmail').mockResolvedValueOnce(userMock);

    const updateUserSpy = jest.spyOn(repository, 'updateUser');

    await usecase.execute('any_email');

    expect(updateUserSpy).toHaveBeenCalled();
  });
});
