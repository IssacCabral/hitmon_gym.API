import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class FindUsersOptionsDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  @IsPositive({
    message: 'page must only contain values greater than or equal to 1',
  })
  page: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  @IsPositive({
    message: 'limit must only contain values greater than or equal to 1',
  })
  limit: number;
}
