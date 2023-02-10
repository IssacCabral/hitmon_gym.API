import { IEquipmentCategory } from '@domain/entities/equipment-category';
import { CreateEquipmentCategoryParams } from '@domain/types/equipment-category-params';

export const equipmentCategoryMock: IEquipmentCategory = {
  id: '1',
  name: 'Pernas',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const createEquipmentCategoryMockParams: CreateEquipmentCategoryParams =
  {
    name: 'Pernas',
  };

export const equipmentCategoriesMock: IEquipmentCategory[] = [
  { id: '1', name: 'Pernas', createdAt: new Date(), updatedAt: new Date() },
  { id: '2', name: 'Braços', createdAt: new Date(), updatedAt: new Date() },
  { id: '3', name: 'Ombro', createdAt: new Date(), updatedAt: new Date() },
];
