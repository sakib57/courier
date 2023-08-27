import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class RideDto {
  @ApiProperty()
  @IsOptional()
  rider_id: number;

  @ApiProperty()
  parcel_count: number;
}
