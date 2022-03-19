import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ParcelDto {
  @ApiProperty()
  merchant_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  pickup_location: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  customer_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  customer_phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  customer_address: string;

  @IsNotEmpty()
  @ApiProperty()
  collect_amount: number;

  @IsNotEmpty()
  @ApiProperty()
  weight: number;

  @IsString()
  @ApiProperty()
  delivery_instruction: string;

  created_at: string;

  updated_at: string;
}
