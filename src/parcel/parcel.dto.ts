import { IsNotEmpty, IsString } from 'class-validator';

export class ParcelDto {
  merchant_id: number;

  @IsString()
  @IsNotEmpty()
  pickup_location: string;

  @IsString()
  @IsNotEmpty()
  customer_name: string;

  @IsString()
  @IsNotEmpty()
  customer_phone: string;

  @IsString()
  @IsNotEmpty()
  customer_address: string;

  @IsNotEmpty()
  collect_ammount: number;

  @IsNotEmpty()
  weight: number;

  @IsString()
  delivery_instruction: string;

  created_at: string;

  updated_at: string;
}
