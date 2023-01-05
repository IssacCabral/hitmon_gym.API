import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CheckAccountVerificationCodeDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 6, {
    message: 'code must be equal to 6 characters',
  })
  code: string;
}
