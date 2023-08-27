import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class PickupRequestDTO {
  @ApiProperty()
  merchant_id: number;

  @ApiProperty()
  branch_id: number;

  @ApiProperty()
  @IsOptional()
  parcel_count: number;

  @ApiProperty()
  pickup_location: string;

  @ApiProperty()
  weight: string;

  created_at: string;

  updated_at: string;
}
