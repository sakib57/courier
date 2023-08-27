import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class MerchantDto {
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  company_name: string;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  contact_number: string;

  @ApiProperty()
  website: string;

  @ApiProperty()
  facebook: string;

  @ApiProperty()
  nid_number: string;

  @ApiProperty()
  passport_number: string;

  @ApiProperty()
  nid_image: string;

  @ApiProperty()
  passport_image: string;

  @ApiProperty()
  @IsNotEmpty()
  in_city_rate: number;

  @ApiProperty()
  @IsNotEmpty()
  out_city_rate: number;

  @ApiProperty()
  bank_name: string;

  @ApiProperty()
  bank_branch: string;

  @ApiProperty()
  bank_acc_name: string;

  @ApiProperty()
  bank_acc_no: string;

  @ApiProperty()
  bank_routing_no: string;

  @ApiProperty()
  bkash_no: string;
}
