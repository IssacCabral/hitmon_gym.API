import { IEquipmentCategory } from '@domain/entities/equipment-category';
import {
  CreateEquipmentCategoryParams,
  UpdateEquipmentCategoryParams,
} from '@domain/types/equipment-category-params';

export interface IEquipmentCategoryRepository {
  createEquipmentCategory(
    equipmentCategory: CreateEquipmentCategoryParams,
  ): Promise<IEquipmentCategory>;
  findEquipmentCategoryByName(name: string): Promise<IEquipmentCategory | null>;
  findAllEquipmentCategories(): Promise<IEquipmentCategory[]>;
  findEquipmentCategoryById(id: string): Promise<IEquipmentCategory | null>;
  updateEquipmentCategory(
    id: string,
    params: UpdateEquipmentCategoryParams,
  ): Promise<IEquipmentCategory>;
}
