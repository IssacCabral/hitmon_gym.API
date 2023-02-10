import { IEquipmentCategoryRepository } from '@data/repositories/equipment-category-repository';
import { DbFindEquipmentCategoriesUseCase } from '@data/usecases/equipment-category/db-find-equipment-categories';
import { makeEquipmentCategoryRepository } from '@tests/mocks/repository/equipment-category-repository';

interface SutTypes {
  usecase: DbFindEquipmentCategoriesUseCase;
  repository: IEquipmentCategoryRepository;
}

const makeSut = (): SutTypes => {
  const repository = makeEquipmentCategoryRepository();
  const usecase = new DbFindEquipmentCategoriesUseCase(repository);
  return {
    usecase,
    repository,
  };
};

describe('# UseCase - find equipment categories', () => {
  it('Should throw if findAllEquipmentCategories throws', async () => {
    const { usecase, repository } = makeSut();
    jest
      .spyOn(repository, 'findAllEquipmentCategories')
      .mockImplementationOnce(() => {
        throw new Error();
      });
    const promise = usecase.execute();
    await expect(promise).rejects.toThrow();
  });

  // it('Should call findManyUsers with correct values', async () => {
  //   const { usecase, repository } = makeSut();
  //   const findManySpy = jest.spyOn(repository, 'findManyUsers');

  //   await usecase.execute(request);

  //   expect(findManySpy).toHaveBeenCalledWith({ page: 1, limit: 1 });
  // });

  // it('Should return paginated users', async () => {
  //   const { usecase } = makeSut();
  //   const result = await usecase.execute(request);

  //   expect(result).toHaveProperty('data', usersMock);
  //   expect(result).toHaveProperty('meta', {
  //     page: 1,
  //     limit: 1,
  //     total: 3,
  //     hasNext: true,
  //   });
  // });
});
