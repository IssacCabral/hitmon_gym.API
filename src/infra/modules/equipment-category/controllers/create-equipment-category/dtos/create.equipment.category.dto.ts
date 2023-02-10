import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateEquipmentCategoryDto {
  @IsNotEmpty({ message: 'name can not be empty' })
  @MinLength(3)
  @MaxLength(30)
  name: string;
}
