import { BusinessError } from '@domain/errors/business-error';
import { IUpdateEquipmentCategoryNameUseCase } from '@domain/usecases/equipment-category/update-equipment-category-name';
import { JwtAuthGuard } from '@infra/modules/auth/controllers/authentication/guards/jwt-auth.guard';
import { Roles } from '@infra/modules/auth/role/decorator/roles.decorator';
import { Role } from '@infra/modules/auth/role/enums/role.enum';
import { RolesGuard } from '@infra/modules/auth/role/guards/roles.guard';
import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  Inject,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UPDATE_EQUIPMENT_CATEGORY_NAME_USE_CASE } from '../../equipment.category.providers';
import {
  EquipmentCategoryIdDto,
  UpdateEquipmentCategoryNameDto,
} from './dtos/update.equipment.category.name.dto';

@Controller('equipment-categories')
export class UpdateEquipmentCategoryNameController {
  constructor(
    @Inject(UPDATE_EQUIPMENT_CATEGORY_NAME_USE_CASE)
    private readonly updateEquipmentCategoryNameUseCase: IUpdateEquipmentCategoryNameUseCase,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch('/:id')
  async handle(
    @Body() updateEquipmentCategoryNameDto: UpdateEquipmentCategoryNameDto,
    @Param() equipmentCategoryIdDto: EquipmentCategoryIdDto,
  ) {
    try {
      const { id } = equipmentCategoryIdDto;
      const { name } = updateEquipmentCategoryNameDto;
      const updatedEquipmentCategory =
        await this.updateEquipmentCategoryNameUseCase.execute(id, name);
      return updatedEquipmentCategory;
    } catch (error) {
      if (error instanceof BusinessError) {
        throw new HttpException(error.message, error.statusCode);
      }
      throw new BadRequestException(error);
    }
  }
}
