import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AssignDto {
  @IsNotEmpty()
  @ApiProperty()
  parcel_id: number;

  @IsNotEmpty()
  @ApiProperty()
  rider_id: number;
}
