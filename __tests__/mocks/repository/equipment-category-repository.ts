import { IEquipmentCategoryRepository } from '@data/repositories/equipment-category-repository';
import { IEquipmentCategory } from '@domain/entities/equipment-category';
import { CreateEquipmentCategoryParams } from '@domain/types/equipment-category-params';
import { EquipmentCategory } from '@prisma/client';
import { equipmentCategoryMock } from '../entities/equipment-category-mock';

export const makeEquipmentCategoryRepository =
  (): IEquipmentCategoryRepository => {
    class EquipmentCategoryStub implements IEquipmentCategoryRepository {
      createEquipmentCategory(
        equipmentCategory: CreateEquipmentCategoryParams,
      ): Promise<IEquipmentCategory> {
        return Promise.resolve(equipmentCategoryMock);
      }
      findEquipmentCategoryByName(name: string): Promise<EquipmentCategory> {
        return Promise.resolve(equipmentCategoryMock);
      }
    }

    return new EquipmentCategoryStub();
  };
