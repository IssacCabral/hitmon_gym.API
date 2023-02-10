import { IEquipmentCategoryRepository } from '@data/repositories/equipment-category-repository';
import { IEquipmentRepository } from '@data/repositories/equipment-repository';
import { BusinessError } from '@domain/errors/business-error';
import {
  CreateEquipmentParams,
  CreateEquipmentReturns,
} from '@domain/types/equipment-params';
import { ICreateEquipmentUseCase } from '@domain/usecases/equipment/create-equipment';
import { EQUIPMENT_CATEGORY_REPOSITORY } from '@infra/modules/equipment-category/equipment.category.providers';
import { EQUIPMENT_REPOSITORY } from '@infra/modules/equipment/equipment.providers';
import { Inject } from '@nestjs/common';

export class DbCreateEquipmentUseCase implements ICreateEquipmentUseCase {
  constructor(
    @Inject(EQUIPMENT_REPOSITORY)
    private readonly equipmentRepository: IEquipmentRepository,
    @Inject(EQUIPMENT_CATEGORY_REPOSITORY)
    private readonly equipmentCategoryRepository: IEquipmentCategoryRepository,
  ) {}

  async execute(
    params: CreateEquipmentParams,
  ): Promise<CreateEquipmentReturns> {
    const { name, equipmentCategoryId } = params;
    const nameAlreadyExists =
      await this.equipmentRepository.findEquipmentByName(name);

    if (nameAlreadyExists) {
      throw new BusinessError('Name already exists');
    }

    const equipmentCategory =
      await this.equipmentCategoryRepository.findEquipmentCategoryById(
        equipmentCategoryId,
      );

    if (!equipmentCategory) {
      throw new BusinessError('EquipmentCategory is not found', 404);
    }

    const equipment = await this.equipmentRepository.createEquipment(params);

    return {
      equipment,
    };
  }
}
