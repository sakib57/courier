import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import Permission from 'src/permission/permission.type';

export class MerchantUpdateDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  company_name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
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
  logo: string;

  @ApiProperty()
  nid_f_image: string;

  @ApiProperty()
  nid_b_image: string;

  @ApiProperty()
  passport_image: string;

  @ApiProperty()
  in_city_rate: number;

  @ApiProperty()
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

  @ApiProperty({
    enum: Permission,
    isArray: true,
  })
  @IsOptional()
  @IsEnum(Permission, { each: true })
  permissions: Permission[];

  @ApiProperty()
  isActive: boolean;
}
