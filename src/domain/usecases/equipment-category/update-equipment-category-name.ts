import { UpdateEquipmentCategoryReturns } from '@domain/types/equipment-category-params';

export interface IUpdateEquipmentCategoryNameUseCase {
  execute(id: string, name: string): Promise<UpdateEquipmentCategoryReturns>;
}
