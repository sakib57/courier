import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Match } from 'src/common/match-validator';

export class BranchDto {
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  user_email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @Match('password', {
    message: 'password does not match with confirm password',
  })
  password_confirm: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  district_id: number;
}
