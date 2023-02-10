import { DbCreateEquipmentUseCase } from '@data/usecases/equipment/db-create-equipment';
import { Module } from '@nestjs/common';
import { CREATE_EQUIPMENT_USE_CASE } from '../../equipment.providers';
import { CreateEquipmentController } from './create.equipment.controller';
import { DbCreateEquipmentUseCaseModule } from './usecase-module/db.usecase.module';

@Module({
  imports: [DbCreateEquipmentUseCaseModule],
  controllers: [CreateEquipmentController],
  providers: [
    {
      provide: CREATE_EQUIPMENT_USE_CASE,
      useClass: DbCreateEquipmentUseCase,
    },
  ],
})
export class CreateEquipmentModule {}
