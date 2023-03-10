import { IDate } from '@data/protocols/date';
import { IUserRepository } from '@data/repositories/user-repository';
import { DbCheckAccountVerificationCodeUseCase } from '@data/usecases/user/db-check-account-verification-code';
import { IUser, RegistrationStep } from '@domain/entities/user';
import { BusinessError } from '@domain/errors/business-error';
import { userMock } from '@tests/mocks/entities/user-mock';
import { makeUserRepository } from '@tests/mocks/repository/user-mock-repository';
import { makeDateService } from '@tests/mocks/usecase/protocols/date-mock';

interface SutTypes {
  usecase: DbCheckAccountVerificationCodeUseCase;
  repository: IUserRepository;
  dateService: IDate;
}

const makeSut = (): SutTypes => {
  const repository = makeUserRepository();
  const dateService = makeDateService();
  const usecase = new DbCheckAccountVerificationCodeUseCase(
    repository,
    dateService,
  );

  return {
    usecase,
    repository,
    dateService,
  };
};

describe('# UseCase - check account verification code', () => {
  it('Should throw a BusinessError if user is not found', async () => {
    const { usecase, repository } = makeSut();
    jest.spyOn(repository, 'findUserById').mockResolvedValueOnce(null);
    const promise = usecase.execute('123456', 'any_id');
    await expect(promise).rejects.toThrowError(
      new BusinessError('User is not found', 404),
    );
  });

  it('Should throw if findUserById throws', async () => {
    const { usecase, repository } = makeSut();
    jest.spyOn(repository, 'findUserById').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = usecase.execute('123456', 'any_id');
    await expect(promise).rejects.toThrow();
  });

  it('Should call findUserById with correct id', async () => {
    const { usecase, repository } = makeSut();
    const findByIdSpy = jest
      .spyOn(repository, 'findUserById')
      .mockResolvedValueOnce({
        ...userMock,
        id: 'any_id',
        accountVerificationCode: '123456',
      } as IUser);
    await usecase.execute('123456', 'any_id');
    expect(findByIdSpy).toHaveBeenCalledWith('any_id');
  });

  it('Should throw a BusinessError if user is already verified', async () => {
    const { usecase, repository } = makeSut();

    jest.spyOn(repository, 'findUserById').mockResolvedValueOnce({
      id: 'any_id',
      registrationStep: RegistrationStep.VERIFIED,
    } as IUser);

    const promise = usecase.execute('123456', 'any_id');

    await expect(promise).rejects.toThrowError(
      new BusinessError('User is already verified'),
    );
  });

  it('Should throw a BusinessError if code does not match', async () => {
    const { usecase, repository, dateService } = makeSut();

    jest.spyOn(repository, 'findUserById').mockResolvedValueOnce({
      id: 'any_id',
      accountVerificationCode: '12345',
    } as IUser);

    jest.spyOn(usecase, 'isNotExpired' as any).mockReturnValueOnce(false);

    const promise = usecase.execute('123456', 'any_id');

    await expect(promise).rejects.toThrowError(
      new BusinessError('Invalid code', 401),
    );
  });

  it('Should throw a BusinessError if code is expired', async () => {
    const { usecase, repository, dateService } = makeSut();

    jest.spyOn(repository, 'findUserById').mockResolvedValueOnce({
      id: 'any_id',
      accountVerificationCode: '123456',
    } as IUser);

    jest.spyOn(usecase, 'isNotExpired' as any).mockReturnValueOnce(false);

    const promise = usecase.execute('123456', 'any_id');

    await expect(promise).rejects.toThrowError(
      new BusinessError('Expired code', 401),
    );
  });

  it('Should call repository to update user with correct values', async () => {
    const { usecase, repository } = makeSut();

    jest.spyOn(repository, 'findUserById').mockResolvedValueOnce({
      id: 'any_id',
      accountVerificationCode: '123456',
    } as IUser);

    const updateRepoSpy = jest.spyOn(repository, 'updateUser');
    await usecase.execute('123456', 'any_id');

    expect(updateRepoSpy).toHaveBeenCalledWith('any_id', {
      accountVerificationCode: null,
      accountVerificationCodeExpiresAt: null,
      registrationStep: RegistrationStep.VERIFIED,
    });
  });
});
