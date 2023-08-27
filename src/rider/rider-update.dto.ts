import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RiderUpdateDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  address: string;

  @ApiProperty()
  contact_number: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  isActive: boolean;
}
