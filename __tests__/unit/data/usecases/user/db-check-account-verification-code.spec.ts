import { IDate } from '@data/protocols/date';
import { IUserRepository } from '@data/repositories/user-repository';
import { DbCheckAccountVerificationCodeUseCase } from '@data/usecases/db-check-account-verification-code';
import { BusinessError } from '@domain/errors/business-error';
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

    const promise = usecase.execute('FFFFFF', '1');
    await expect(promise).rejects.toThrowError(
      new BusinessError('User is not found', 404),
    );
  });
});
