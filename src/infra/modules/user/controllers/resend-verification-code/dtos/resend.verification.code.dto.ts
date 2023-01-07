import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResendVerificationCodeDto {
  @IsEmail()
  @IsNotEmpty({ message: 'email can not be empty' })
  email: string;
}
