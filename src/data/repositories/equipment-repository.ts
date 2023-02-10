import { IEquipment } from '@domain/entities/equipment';
import {
  CreateEquipmentParams,
  CreateEquipmentReturns,
} from '@domain/types/equipment-params';

export interface IEquipmentRepository {
  createEquipment(
    equipment: CreateEquipmentParams,
  ): Promise<CreateEquipmentReturns>;
  findEquipmentByName(name: string): Promise<IEquipment | null>;
}
