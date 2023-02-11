import { IEquipmentCategoryRepository } from '@data/repositories/equipment-category-repository';
import { IEquipmentCategory } from '@domain/entities/equipment-category';
import { BusinessError } from '@domain/errors/business-error';
import { UpdateEquipmentCategoryReturns } from '@domain/types/equipment-category-params';
import { IUpdateEquipmentCategoryUseCase } from '@domain/usecases/equipment-category/edit-equipment-category';

export class DbUpdateEquipmentCategoryUseCase
  implements IUpdateEquipmentCategoryUseCase
{
  constructor(
    private readonly equipmentCategoryRepository: IEquipmentCategoryRepository,
  ) {}

  async execute(
    id: string,
    params: Partial<IEquipmentCategory>,
  ): Promise<UpdateEquipmentCategoryReturns> {
    const equipmentCategory =
      await this.equipmentCategoryRepository.findEquipmentCategoryById(id);

    if (!equipmentCategory) {
      throw new BusinessError('EquipmentCategory is not found', 404);
    }

    const findEquipmentCategoryByParamName =
      await this.equipmentCategoryRepository.findEquipmentCategoryByName(
        params.name,
      );

    if (
      findEquipmentCategoryByParamName &&
      equipmentCategory.name !== findEquipmentCategoryByParamName.name
    ) {
      throw new BusinessError('Name already exists');
    }

    const updatedEquipmentCategory =
      await this.equipmentCategoryRepository.updateEquipmentCategory(
        id,
        params,
      );

    return {
      updatedEquipmentCategory,
    };
  }
}
