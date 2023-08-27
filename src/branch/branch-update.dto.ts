import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BranchUpdateDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  isActive: boolean;
}
