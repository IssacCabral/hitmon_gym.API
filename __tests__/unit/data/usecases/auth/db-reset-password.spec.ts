import { IDate } from '@data/protocols/date';
import { IHash } from '@data/protocols/hash';
import { IUserRepository } from '@data/repositories/user-repository';
import { DbResetPasswordUseCase } from '@data/usecases/auth/db-reset-password';
import { BusinessError } from '@domain/errors/business-error';
import { makeUserRepository } from '@tests/mocks/repository/user-mock-repository';
import { makeDateService } from '@tests/mocks/usecase/protocols/date-mock';
import { makeHashService } from '@tests/mocks/usecase/protocols/hash-mock';

interface SutTypes {
  usecase: DbResetPasswordUseCase;
  repository: IUserRepository;
  hashService: IHash;
  dateService: IDate;
}

const makeSut = (): SutTypes => {
  const repository = makeUserRepository();
  const hashService = makeHashService();
  const dateService = makeDateService();
  const usecase = new DbResetPasswordUseCase(
    repository,
    hashService,
    dateService,
  );
  return {
    usecase,
    repository,
    dateService,
    hashService,
  };
};

const request = {
  code: '12345678',
  email: 'any_email',
  newPassword: 'new_pass',
};

describe('# UseCase - reset password', () => {
  it('Should throw a BusinessError if user is not found', async () => {
    const { usecase, repository } = makeSut();

    jest
      .spyOn(repository, 'findUserByPasswordResetCode')
      .mockReturnValueOnce(null);

    const promise = usecase.execute(request);

    await expect(promise).rejects.toThrowError(
      new BusinessError('User is not found', 404),
    );
  });

  it('Should throw if findUserByPasswordResetCode throws', async () => {
    const { usecase, repository } = makeSut();
    jest
      .spyOn(repository, 'findUserByPasswordResetCode')
      .mockImplementationOnce(() => {
        throw new Error();
      });
    const promise = usecase.execute(request);
    await expect(promise).rejects.toThrow();
  });

  it('Should call findUserByPasswordResetCode with correct values', async () => {
    const { usecase, repository } = makeSut();
    const findByPasswordResetCode = jest.spyOn(
      repository,
      'findUserByPasswordResetCode',
    );

    await usecase.execute(request);
    expect(findByPasswordResetCode).toHaveBeenCalledWith(
      '12345678',
      'any_email',
    );
  });

  it('Should throw if dateService throws', async () => {
    const { dateService, usecase } = makeSut();

    jest.spyOn(dateService, 'checkIfAfter').mockReturnValueOnce(false);

    const promise = usecase.execute(request);
    await expect(promise).rejects.toThrow();
  });

  it('Should throw a BusinessError if code is expired', async () => {
    const { usecase } = makeSut();

    jest.spyOn(usecase, 'isNotExpired' as any).mockReturnValueOnce(false);

    const promise = usecase.execute(request);

    await expect(promise).rejects.toThrowError(
      new BusinessError('Expired code', 401),
    );
  });

  it('Should throw if hashService throws', async () => {
    const { usecase, hashService } = makeSut();

    jest.spyOn(hashService, 'generateHash').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = usecase.execute(request);
    await expect(promise).rejects.toThrow();
  });

  it('Should call hashService with correct password', async () => {
    const { usecase, hashService } = makeSut();

    const hashServiceSpy = jest.spyOn(hashService, 'generateHash');

    await usecase.execute(request);

    expect(hashServiceSpy).toHaveBeenCalledWith('new_pass');
  });

  it('Should throw if updateUser throws', async () => {
    const { usecase, repository } = makeSut();

    jest.spyOn(repository, 'updateUser').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = usecase.execute(request);
    await expect(promise).rejects.toThrow();
  });

  it('Should call repository to update new password', async () => {
    const { usecase, repository } = makeSut();
    const updateUserSpy = jest.spyOn(repository, 'updateUser');

    await usecase.execute(request);

    expect(updateUserSpy).toHaveBeenCalledWith('1', {
      password: 'hashed_value',
      passwordResetCode: null,
      passwordResetCodeExpiresAt: null,
    });
  });
});
