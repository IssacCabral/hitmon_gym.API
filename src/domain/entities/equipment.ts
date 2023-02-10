import { IBaseEntity } from './base-entity';

export interface IEquipment extends IBaseEntity {
  name: string;
  equipmentCategoryId: string;
}
