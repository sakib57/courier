import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Match } from 'src/common/match-validator';

export class CreateOperatorDTO {
  id: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(6)
  @ApiProperty({ required: true })
  password: string;

  @Match('password')
  @ApiProperty()
  password_confirm: string;

  @ApiProperty({ required: true })
  branch_id: number;
}
