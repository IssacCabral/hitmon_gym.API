import { Module } from '@nestjs/common';
import { CreateEquipmentModule } from './controllers/create-equipment/create.equipment.module';

@Module({
  imports: [CreateEquipmentModule],
  exports: [EquipmentModule],
})
export class EquipmentModule {}
