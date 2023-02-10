import { IsNotEmpty, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateEquipmentDto {
  @IsNotEmpty({ message: 'name can not be empty' })
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsNotEmpty({ message: 'equipmentCategoryId can not be empty' })
  @IsUUID()
  equipmentCategoryId: string;
}
