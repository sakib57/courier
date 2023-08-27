import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ParcelUpdateDto {
  @ApiProperty()
  order_id: string;

  @ApiProperty()
  @IsOptional()
  d_branch_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  pickup_location: string;

  @IsString()
  @ApiProperty()
  pickup_date: Date;

  @IsString()
  @ApiProperty()
  delivery_date: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  customer_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  customer_phone: string;

  @ApiProperty()
  customer_district: string;

  @ApiProperty()
  customer_upazila: string;

  @ApiProperty()
  customer_road: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  customer_address: string;

  @IsNotEmpty()
  @ApiProperty()
  collect_amount: number;

  @ApiProperty()
  product_cost_amount: number;

  @ApiProperty()
  delivery_fees: number;

  @ApiProperty()
  cod_fees: number;

  @ApiProperty()
  discount: number;

  @ApiProperty()
  promo_discount: number;

  @ApiProperty()
  additional_charge: number;

  @ApiProperty()
  compensation_cost: number;

  @IsNotEmpty()
  @ApiProperty()
  weight: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  item_description: string;

  @ApiProperty()
  delivery_instruction: string;
}
