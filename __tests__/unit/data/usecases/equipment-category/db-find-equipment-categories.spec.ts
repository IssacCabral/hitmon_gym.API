import { IEquipmentCategoryRepository } from '@data/repositories/equipment-category-repository';
import { DbFindEquipmentCategoriesUseCase } from '@data/usecases/equipment-category/db-find-equipment-categories';
import { equipmentCategoriesMock } from '@tests/mocks/entities/equipment-category-mock';
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

  it('Should return all equipment categories', async () => {
    const { usecase } = makeSut();
    const result = await usecase.execute();

    expect(result).toBeTruthy();
    expect(result).toEqual(equipmentCategoriesMock);
    expect(result.length).toBe(3);
  });
});
