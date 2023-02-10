import { IEquipment } from '@domain/entities/equipment';
import { CreateEquipmentParams } from '@domain/types/equipment-params';

export interface IEquipmentRepository {
  createEquipment(equipment: CreateEquipmentParams): Promise<IEquipment>;
  findEquipmentByName(name: string): Promise<IEquipment | null>;
}
