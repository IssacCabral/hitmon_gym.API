import { IEquipmentRepository } from '@data/repositories/equipment-repository';
import { IEquipment } from '@domain/entities/equipment';
import { CreateEquipmentParams } from '@domain/types/equipment-params';
import { equipmentMock } from '../entities/equipment-mock';

export const makeEquipmentRepository = (): IEquipmentRepository => {
  class EquipmentRepositoryStub implements IEquipmentRepository {
    createEquipment(equipment: CreateEquipmentParams): Promise<IEquipment> {
      return Promise.resolve(equipmentMock);
    }

    findEquipmentByName(name: string): Promise<IEquipment> {
      return Promise.resolve(equipmentMock);
    }
  }

  return new EquipmentRepositoryStub();
};
