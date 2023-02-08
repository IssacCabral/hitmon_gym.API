import { IEquipmentCategoryRepository } from '@data/repositories/equipment-category-repository';
import { DbCreateEquipmentCategoryUseCase } from '@data/usecases/equipment-category/db-create-equipment-category';
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
  it('Should throw a BusinessError if name already exists', async () => {});
});
