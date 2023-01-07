import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  @IsNotEmpty({ message: 'email can not be empty' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 6, {
    message: 'code must be equal to 6 characters',
  })
  code: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  @IsNotEmpty({ message: 'newPassword can not be empty' })
  newPassword: string;
}
