import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateTokenResetPasswordDto {
  @IsEmail()
  @IsNotEmpty({ message: 'email can not be empty' })
  email: string;
}
