import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class PickupRequestUpdateDTO {
  @ApiProperty()
  @IsOptional()
  rider_id: number;

  @ApiProperty()
  @IsOptional()
  parcel_count: number;

  @ApiProperty()
  @IsOptional()
  status: string;

  created_at: string;

  updated_at: string;
}
