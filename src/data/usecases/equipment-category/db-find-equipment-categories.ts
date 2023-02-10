import { IEquipmentCategoryRepository } from '@data/repositories/equipment-category-repository';
import { IEquipmentCategory } from '@domain/entities/equipment-category';
import { IFindEquipmentCategories } from '@domain/usecases/equipment-category/find-equipment-categories';

export class DbFindEquipmentCategoriesUseCase
  implements IFindEquipmentCategories
{
  constructor(
    private readonly equipmentCategoryRepository: IEquipmentCategoryRepository,
  ) {}

  async execute(): Promise<IEquipmentCategory[]> {
    return this.equipmentCategoryRepository.findAllEquipmentCategories();
  }
}
