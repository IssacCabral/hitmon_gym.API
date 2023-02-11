import { IsNotEmpty, IsUUID, MaxLength, MinLength } from 'class-validator';

export class UpdateEquipmentCategoryNameDto {
  @IsNotEmpty({ message: 'name can not be empty' })
  @MinLength(3)
  @MaxLength(30)
  name: string;
}

export class EquipmentCategoryIdDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
