import {
  UpdateEquipmentCategoryParams,
  UpdateEquipmentCategoryReturns,
} from '@domain/types/equipment-category-params';

export interface IUpdateEquipmentCategoryUseCase {
  execute(
    id: string,
    params: UpdateEquipmentCategoryParams,
  ): Promise<UpdateEquipmentCategoryReturns>;
}
