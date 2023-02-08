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
});
