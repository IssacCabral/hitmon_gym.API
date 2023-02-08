import {
  CreateEquipmentCategoryParams,
  CreateEquipmentCategoryReturns,
} from '@domain/types/equipment-category-params';

export interface ICreateEquipmentCategoryUseCase {
  execute(
    params: CreateEquipmentCategoryParams,
  ): Promise<CreateEquipmentCategoryReturns>;
}
