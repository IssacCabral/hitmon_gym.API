import { IEquipmentCategoryRepository } from '@data/repositories/equipment-category-repository';
import { DbCreateEquipmentCategoryUseCase } from '@data/usecases/equipment-category/db-create-equipment-category';
import { BusinessError } from '@domain/errors/business-error';
import { createEquipmentCategoryMockParams } from '@tests/mocks/entities/equipment-category-mock';
import { makeEquipmentCategoryRepository } from '@tests/mocks/repository/equipment-category-repository';

interface SutTypes {
  usecase: DbCreateEquipmentCategoryUseCase;
  repository: IEquipmentCategoryRepository;
}

const makeSut = (): SutTypes => {
  const repository = makeEquipmentCategoryRepository();
  const usecase = new DbCreateEquipmentCategoryUseCase(repository);
  return {
    usecase,
    repository,
  };
};

describe('# UseCase - create equipment category', () => {
  it('Should throw a BusinessError if name already exists', async () => {
    const { usecase } = makeSut();

    const promise = usecase.execute(createEquipmentCategoryMockParams);
    await expect(promise).rejects.toThrowError(
      new BusinessError('Name already exists'),
    );
  });

  it('Should throw if findEquipmentCategoryByName throws', async () => {
    const { repository, usecase } = makeSut();

    jest
      .spyOn(repository, 'findEquipmentCategoryByName')
      .mockImplementationOnce(() => {
        throw new Error();
      });

    const promise = usecase.execute(createEquipmentCategoryMockParams);
    await expect(promise).rejects.toThrow();
  });

  it('Should call findEquipmentCategoryByName with correct name', async () => {
    const { repository, usecase } = makeSut();

    jest
      .spyOn(repository, 'findEquipmentCategoryByName')
      .mockResolvedValueOnce(null);
    const findEquipmentCategoryByNameSpy = jest.spyOn(
      repository,
      'findEquipmentCategoryByName',
    );

    await usecase.execute(createEquipmentCategoryMockParams);
    expect(findEquipmentCategoryByNameSpy).toHaveBeenCalledWith('Pernas');
  });

  it('Should call createEquipmentCategory with correct name', async () => {
    const { usecase, repository } = makeSut();
    const spy = jest.spyOn(repository, 'createEquipmentCategory');

    jest
      .spyOn(repository, 'findEquipmentCategoryByName')
      .mockResolvedValueOnce(null);

    await usecase.execute(createEquipmentCategoryMockParams);
    expect(spy).toHaveBeenCalledWith({ name: 'Pernas' });
  });

  it('Should create a new equipment category on success', async () => {
    const { usecase, repository } = makeSut();

    jest
      .spyOn(repository, 'findEquipmentCategoryByName')
      .mockResolvedValueOnce(null);

    const result = await usecase.execute(createEquipmentCategoryMockParams);

    expect(result.equipmentCategory).toBeTruthy();
    expect(result.equipmentCategory.id).toBeTruthy();
    expect(result.equipmentCategory.name).toBe('Pernas');
  });
});
