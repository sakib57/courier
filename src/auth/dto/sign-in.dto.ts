import {
  IsEmail,
  IsString,
  //   Matches,
  MinLength,
} from 'class-validator';

export class SignInDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  /* Passwords will contain at least 1 upper case letter
    Passwords will contain at least 1 lower case letter
    Passwords will contain at least 1 number or special character */

  //   @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //     message: 'Password is too week',
  //   })
  @MinLength(6)
  password: string;
}
