import { IEquipmentCategory } from '@domain/entities/equipment-category';

export interface IFindEquipmentCategories {
  execute(): Promise<IEquipmentCategory[]>;
}
