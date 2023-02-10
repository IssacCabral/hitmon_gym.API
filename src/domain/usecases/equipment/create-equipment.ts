import {
  CreateEquipmentParams,
  CreateEquipmentReturns,
} from '@domain/types/equipment-params';

export interface ICreateEquipmentUseCase {
  execute(params: CreateEquipmentParams): Promise<CreateEquipmentReturns>;
}
