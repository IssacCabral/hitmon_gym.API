import { IEquipmentCategory } from '@domain/entities/equipment-category';
import { CreateEquipmentCategoryParams } from '@domain/types/equipment-category-params';
import { EquipmentCategory } from '@prisma/client';

export interface IEquipmentCategoryRepository {
  createEquipmentCategory(
    equipmentCategory: CreateEquipmentCategoryParams,
  ): Promise<IEquipmentCategory>;
  findEquipmentCategoryByName(name: string): Promise<EquipmentCategory | null>;
  findAllEquipmentCategories(): Promise<IEquipmentCategory[]>;
}
