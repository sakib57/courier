import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class MerchantUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

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
  @IsNotEmpty()
  in_city_rate: number;

  @ApiProperty()
  @IsNotEmpty()
  out_city_rate: number;
}
