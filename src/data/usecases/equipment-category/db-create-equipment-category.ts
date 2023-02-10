import { IEquipmentCategoryRepository } from '@data/repositories/equipment-category-repository';
import { BusinessError } from '@domain/errors/business-error';
import {
  CreateEquipmentCategoryParams,
  CreateEquipmentCategoryReturns,
} from '@domain/types/equipment-category-params';
import { ICreateEquipmentCategoryUseCase } from '@domain/usecases/equipment-category/create-equipment-category';
import { EQUIPMENT_CATEGORY_REPOSITORY } from '@infra/modules/equipment-category/equipment.category.providers';
import { Inject } from '@nestjs/common';

export class DbCreateEquipmentCategoryUseCase
  implements ICreateEquipmentCategoryUseCase
{
  constructor(
    @Inject(EQUIPMENT_CATEGORY_REPOSITORY)
    private readonly equipmentCategoryRepository: IEquipmentCategoryRepository,
  ) {}

  async execute(
    params: CreateEquipmentCategoryParams,
  ): Promise<CreateEquipmentCategoryReturns> {
    const { name } = params;

    const nameAlreadyExists =
      await this.equipmentCategoryRepository.findEquipmentCategoryByName(name);

    if (nameAlreadyExists) {
      throw new BusinessError('Name already exists');
    }

    const equipmentCategory =
      await this.equipmentCategoryRepository.createEquipmentCategory(params);

    return {
      equipmentCategory,
    };
  }
}
