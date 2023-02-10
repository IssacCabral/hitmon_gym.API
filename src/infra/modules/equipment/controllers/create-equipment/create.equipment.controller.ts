import { BusinessError } from '@domain/errors/business-error';
import { ICreateEquipmentUseCase } from '@domain/usecases/equipment/create-equipment';
import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  Inject,
  Post,
} from '@nestjs/common';
import { CREATE_EQUIPMENT_USE_CASE } from '../../equipment.providers';
import { CreateEquipmentDto } from './dtos/create.equipment.dto';

@Controller('equipments')
export class CreateEquipmentController {
  constructor(
    @Inject(CREATE_EQUIPMENT_USE_CASE)
    private readonly createEquipmentUseCase: ICreateEquipmentUseCase,
  ) {}

  @Post()
  async handle(@Body() createEquipmentDto: CreateEquipmentDto) {
    try {
      const equipment = await this.createEquipmentUseCase.execute(
        createEquipmentDto,
      );
      return equipment;
    } catch (error) {
      if (error instanceof BusinessError) {
        throw new HttpException(error.message, error.statusCode);
      }
      throw new BadRequestException(error);
    }
  }
}
