import { BusinessError } from '@domain/errors/business-error';
import { ICreateEquipmentCategoryUseCase } from '@domain/usecases/equipment-category/create-equipment-category';
import { JwtAuthGuard } from '@infra/modules/auth/controllers/authentication/guards/jwt-auth.guard';
import { Roles } from '@infra/modules/auth/role/decorator/roles.decorator';
import { Role } from '@infra/modules/auth/role/enums/role.enum';
import { RolesGuard } from '@infra/modules/auth/role/guards/roles.guard';
import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CREATE_EQUIPMENT_CATEGORY_USE_CASE } from '../../equipment.category.providers';
import { CreateEquipmentCategoryDto } from './dtos/create.equipment.category.dto';

@Controller('equipment-categories')
export class CreateEquipmentCategoryController {
  constructor(
    @Inject(CREATE_EQUIPMENT_CATEGORY_USE_CASE)
    private readonly createEquipmentCategoryUseCase: ICreateEquipmentCategoryUseCase,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  async handle(@Body() createEquipmentCategoryDto: CreateEquipmentCategoryDto) {
    try {
      const equipmentCategory =
        await this.createEquipmentCategoryUseCase.execute(
          createEquipmentCategoryDto,
        );
      return equipmentCategory;
    } catch (error) {
      if (error instanceof BusinessError) {
        throw new BadRequestException(error.message, {
          cause: error,
          description: error.name,
        });
      }
      throw new BadRequestException(error);
    }
  }
}
