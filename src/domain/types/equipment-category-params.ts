import { IEquipmentCategory } from '@domain/entities/equipment-category';

export type CreateEquipmentCategoryParams = Omit<
  IEquipmentCategory,
  'id' | 'createdAt' | 'updatedAt'
>;
export type CreateEquipmentCategoryReturns = {
  equipmentCategory: IEquipmentCategory;
};
export type UpdateEquipmentCategoryReturns = {
  updatedEquipmentCategory: IEquipmentCategory;
};
