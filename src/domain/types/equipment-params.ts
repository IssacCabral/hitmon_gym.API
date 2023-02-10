import { IEquipment } from '@domain/entities/equipment';

export type CreateEquipmentParams = Omit<
  IEquipment,
  'id' | 'createdAt' | 'updatedAt'
>;

export type CreateEquipmentReturns = {
  equipment: IEquipment;
};
