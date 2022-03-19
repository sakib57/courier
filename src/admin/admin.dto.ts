import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class AdminDto {
  id: number;

  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;
  accessToken: string;
}
