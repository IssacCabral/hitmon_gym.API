import { IEquipmentCategory } from '@domain/entities/equipment-category';

export interface IFindEquipmentCategoriesUseCase {
  execute(): Promise<IEquipmentCategory[]>;
}
