import { IEquipmentCategoryRepository } from '@data/repositories/equipment-category-repository';
import { IEquipmentCategory } from '@domain/entities/equipment-category';
import { IFindEquipmentCategoriesUseCase } from '@domain/usecases/equipment-category/find-equipment-categories';
import { EQUIPMENT_CATEGORY_REPOSITORY } from '@infra/modules/equipment-category/equipment.category.providers';
import { Inject } from '@nestjs/common';

export class DbFindEquipmentCategoriesUseCase
  implements IFindEquipmentCategoriesUseCase
{
  constructor(
    @Inject(EQUIPMENT_CATEGORY_REPOSITORY)
    private readonly equipmentCategoryRepository: IEquipmentCategoryRepository,
  ) {}

  async execute(): Promise<IEquipmentCategory[]> {
    return this.equipmentCategoryRepository.findAllEquipmentCategories();
  }
}
