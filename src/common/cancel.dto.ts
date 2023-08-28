import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CancelDto {
  @IsNotEmpty()
  @ApiProperty()
  parcel_id: number;

  @IsNotEmpty()
  @ApiProperty()
  rider_id: number;

}
