import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ParcelDto {
  @ApiProperty()
  @IsNotEmpty()
  merchant_id: number;

  @ApiProperty()
  order_id: string;

  @ApiProperty()
  @IsNotEmpty()
  i_branch_id: number;

  @ApiProperty()
  @IsOptional()
  d_branch_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  pickup_location: string;

  @ApiProperty()
  pickup_date: Date;

  @ApiProperty()
  delivery_date: Date;

  @ApiProperty()
  customer_name: string;

  @ApiProperty()
  customer_phone: string;

  @ApiProperty()
  customer_district: string;

  @ApiProperty()
  customer_upazila: string;

  @ApiProperty()
  customer_road: string;

  @ApiProperty()
  customer_address: string;

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

  created_at: string;

  updated_at: string;
}
