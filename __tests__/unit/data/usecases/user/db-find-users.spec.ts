import { IUserRepository } from '@data/repositories/user-repository';
import { DbFindUsersUseCase } from '@data/usecases/user/db-find-users';
import { makeUserRepository } from '@tests/mocks/repository/user-mock-repository';

interface SutTypes {
  usecase: DbFindUsersUseCase;
  repository: IUserRepository;
}

const makeSut = (): SutTypes => {
  const repository = makeUserRepository();
  const usecase = new DbFindUsersUseCase(repository);
  return {
    usecase,
    repository,
  };
};

describe('# UseCase - find users', () => {
  const request = {
    page: 1,
    limit: 1,
  };

  it('Should throw if findManyUsers throws', async () => {
    const { usecase, repository } = makeSut();
    jest.spyOn(repository, 'findManyUsers').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = usecase.execute(request);
    await expect(promise).rejects.toThrow();
  });

  it('Should call findManyUsers with correct values', async () => {
    const { usecase, repository } = makeSut();
    const findManySpy = jest.spyOn(repository, 'findManyUsers');

    await usecase.execute(request);

    expect(findManySpy).toHaveBeenCalledWith({ page: 1, limit: 1 });
  });
});
