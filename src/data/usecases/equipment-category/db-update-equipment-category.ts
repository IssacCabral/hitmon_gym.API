import { IEquipmentCategoryRepository } from '@data/repositories/equipment-category-repository';
import { BusinessError } from '@domain/errors/business-error';
import { UpdateEquipmentCategoryReturns } from '@domain/types/equipment-category-params';
import { IUpdateEquipmentCategoryNameUseCase } from '@domain/usecases/equipment-category/update-equipment-category-name';

export class DbUpdateEquipmentCategoryNameUseCase
  implements IUpdateEquipmentCategoryNameUseCase
{
  constructor(
    private readonly equipmentCategoryRepository: IEquipmentCategoryRepository,
  ) {}

  async execute(
    id: string,
    name: string,
  ): Promise<UpdateEquipmentCategoryReturns> {
    const equipmentCategory =
      await this.equipmentCategoryRepository.findEquipmentCategoryById(id);

    if (!equipmentCategory) {
      throw new BusinessError('EquipmentCategory is not found', 404);
    }

    const findEquipmentCategoryByName =
      await this.equipmentCategoryRepository.findEquipmentCategoryByName(name);

    if (
      findEquipmentCategoryByName &&
      equipmentCategory.name !== findEquipmentCategoryByName.name
    ) {
      throw new BusinessError('Name already exists');
    }

    const updatedEquipmentCategory =
      await this.equipmentCategoryRepository.updateEquipmentCategoryName(
        id,
        name,
      );

    return {
      updatedEquipmentCategory,
    };
  }
}
