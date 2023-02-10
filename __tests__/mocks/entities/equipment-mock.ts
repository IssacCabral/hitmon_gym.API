import { IEquipment } from '@domain/entities/equipment';
import { CreateEquipmentParams } from '@domain/types/equipment-params';

export const equipmentMock: IEquipment = {
  id: '1',
  name: 'Leg Press',
  equipmentCategoryId: '1',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const createEquipmentMock: CreateEquipmentParams = {
  name: 'Leg Press',
  equipmentCategoryId: '1',
};
