import { IEquipmentCategory } from '@domain/entities/equipment-category';
import { CreateEquipmentCategoryParams } from '@domain/types/equipment-category-params';

export interface IEquipmentCategoryRepository {
  createEquipmentCategory(
    equipmentCategory: CreateEquipmentCategoryParams,
  ): Promise<IEquipmentCategory>;
  findEquipmentCategoryByName(name: string): Promise<IEquipmentCategory | null>;
  findAllEquipmentCategories(): Promise<IEquipmentCategory[]>;
  findEquipmentCategoryById(id: string): Promise<IEquipmentCategory | null>;
  updateEquipmentCategoryName(
    id: string,
    name: string,
  ): Promise<IEquipmentCategory>;
}
