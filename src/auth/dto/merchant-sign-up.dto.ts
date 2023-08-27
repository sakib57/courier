import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { Match } from 'src/common/match-validator';

export class MerchantSignUpDto {
  @IsString()
  @MinLength(2)
  @ApiProperty()
  name: string;

  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  /* Passwords will contain at least 1 upper case letter
      Passwords will contain at least 1 lower case letter
      Passwords will contain at least 1 number or special character */

  //   @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //     message: 'Password is too week',
  //   })
  @MinLength(6)
  @ApiProperty()
  password: string;

  @Match('password')
  @ApiProperty()
  password_confirm: string;

  @IsString()
  @ApiProperty()
  company_name: string;

  @IsString()
  @ApiProperty()
  address: string;

  @IsString()
  @ApiProperty()
  contact_number: string;

  @ApiProperty()
  branch_id: number;

  @ApiProperty()
  parent_merchant_id: number;
}
